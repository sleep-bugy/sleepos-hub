// dataService.ts
import { Device, Rom, Application, Changelog, SiteSettings, User } from './types';

const STORAGE_KEYS = {
  DEVICES: 'ps_devices',
  APPLICATIONS: 'ps_applications',
  CHANGELOGS: 'ps_changelogs',
  SETTINGS: 'ps_settings',
  CURRENT_USER: 'ps_current_user',
};

// Initialize with default data if not exists
const initializeStorage = () => {
  // Remove old storage keys that are no longer used to prevent conflicts
  if (localStorage.getItem('ps_roms')) {
    localStorage.removeItem('ps_roms');
  }

  // Initialize current user if not exists
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    const defaultUser: User = {
      id: 1,
      email: "admin@projectsleep.com",
      password: "admin123", // In production, this should be a hashed password
      role: "admin"
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
  }

  if (!localStorage.getItem(STORAGE_KEYS.DEVICES)) {
    const defaultDevices: Device[] = [
      {
        id: 1,
        name: "Xiaomi Mi 9",
        codename: "cepheus",
        status: "Active",
        lastUpdate: "2025-11-15",
        roms: [
          { id: 1, device: "Xiaomi Mi 9", deviceCodename: "cepheus", maintainer: "John Doe", romType: "SleepOS", version: "v2.3.1", size: "1.2 GB", downloads: 1234, status: "Active", uploadDate: "2025-11-15", downloadUrl: "https://example.com/cepheus-sleepos-v2.3.1.zip", changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches" },
          { id: 2, device: "Xiaomi Mi 9", deviceCodename: "cepheus", maintainer: "Jane Smith", romType: "AOSP", version: "v1.5.0", size: "980 MB", downloads: 892, status: "Active", uploadDate: "2025-11-10", downloadUrl: "https://example.com/cepheus-aosp-v1.5.0.zip", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates" }
        ]
      },
      {
        id: 2,
        name: "POCO X3 NFC",
        codename: "surya",
        status: "Active",
        lastUpdate: "2025-11-16",
        roms: [
          { id: 3, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Jane Smith", romType: "SleepOS", version: "v1.2.0", size: "1.8 GB", downloads: 567, status: "Active", uploadDate: "2025-11-20", downloadUrl: "https://example.com/surya-sleepos-v1.2.0.zip", changelog: "# v1.2.0\n- Improved camera performance\n- Enhanced battery life" },
          { id: 4, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Alex Johnson", romType: "AOSP", version: "12.2", size: "1.5 GB", downloads: 321, status: "Active", uploadDate: "2025-11-18", downloadUrl: "https://example.com/surya-aosp-12.2.zip", changelog: "# 12.2\n- Updated to Android 12.2\n- Security patches up to Nov 2025" },
          { id: 5, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Sarah Lee", romType: "Port", version: "v3.0.1", size: "2.1 GB", downloads: 123, status: "Active", uploadDate: "2025-11-15", downloadUrl: "https://example.com/surya-port-v3.0.1.zip", changelog: "# v3.0.1\n- Ported OnePlus camera features\n- Added OnePlus gallery app" }  // Changed version to avoid duplication
        ]
      },
      {
        id: 3,
        name: "Redmi Note 10",
        codename: "sweet",
        status: "Active",
        lastUpdate: "2025-11-14",
        roms: [
          { id: 6, device: "Redmi Note 10", deviceCodename: "sweet", maintainer: "Alex Johnson", romType: "SleepOS", version: "v1.0.5", size: "1.6 GB", downloads: 445, status: "Active", uploadDate: "2025-11-12", downloadUrl: "https://example.com/sweet-sleepos-v1.0.5.zip", changelog: "# v1.0.5\n- Improved audio quality\n- Fixed network issues" },
          { id: 7, device: "Redmi Note 10", deviceCodename: "sweet", maintainer: "Maria Garcia", romType: "Port", version: "v2.0.1", size: "1.9 GB", downloads: 278, status: "Active", uploadDate: "2025-11-10", downloadUrl: "https://example.com/sweet-port-v2.0.1.zip", changelog: "# v2.0.1\n- Added Samsung OneUI features\n- Improved performance" }
        ]
      },
      {
        id: 4,
        name: "OnePlus 7 Pro",
        codename: "guacamole",
        status: "Active",
        lastUpdate: "2025-11-10",
        roms: [
          { id: 8, device: "OnePlus 7 Pro", deviceCodename: "guacamole", maintainer: "Mike Wilson", romType: "AOSP", version: "v1.5.0", size: "980 MB", downloads: 892, status: "Active", uploadDate: "2025-11-10", downloadUrl: "https://example.com/guacamole-aosp-v1.5.0.zip", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates" }
        ]
      },
      {
        id: 5,
        name: "Samsung Galaxy S10",
        codename: "beyond1lte",
        status: "Active",
        lastUpdate: "2025-11-12",
        roms: [
          { id: 9, device: "Samsung Galaxy S10", deviceCodename: "beyond1lte", maintainer: "Sarah Lee", romType: "Port", version: "v3.0.2", size: "1.4 GB", downloads: 567, status: "Active", uploadDate: "2025-11-12", downloadUrl: "https://example.com/beyond1lte-port-v3.0.2.zip", changelog: "# v3.0.2\n- Ported OneUI features\n- Camera improvements" }
        ]
      },
    ];
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(defaultDevices));
  }

  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    const defaultApplications: Application[] = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Developer", portfolio: "github.com/john", message: "Experienced Android developer with 5 years of experience", status: "Pending", date: "2025-11-15" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer", portfolio: "dribbble.com/jane", message: "UI/UX designer with focus on Android interfaces", status: "Reviewed", date: "2025-11-14" },
      { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "Maintainer", portfolio: "github.com/alex", message: "Want to maintain OnePlus devices for Project Sleep", status: "Pending", date: "2025-11-12" },
      { id: 4, name: "Maria Garcia", email: "maria@example.com", role: "Tester", portfolio: "github.com/maria", message: "QA engineer interested in testing ROMs", status: "Accepted", date: "2025-11-10" },
      { id: 5, name: "David Wilson", email: "david@example.com", role: "Developer", portfolio: "github.com/david", message: "Kernel developer with C++ expertise", status: "Rejected", date: "2025-11-08" },
    ];
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(defaultApplications));
  }

  if (!localStorage.getItem(STORAGE_KEYS.CHANGELOGS)) {
    const defaultChangelogs: Changelog[] = [
      { id: 1, device: "Xiaomi Mi 9", romType: "SleepOS", version: "v2.3.1", date: "2025-11-15", changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches", status: "Published" },
      { id: 2, device: "OnePlus 7 Pro", romType: "AOSP", version: "v1.5.0", date: "2025-11-10", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates", status: "Published" },
      { id: 3, device: "Samsung Galaxy S10", romType: "Port", version: "v3.0.2", date: "2025-11-12", changelog: "# v3.0.2\n- Ported OneUI features\n- Camera improvements", status: "Draft" },
      { id: 4, device: "Google Pixel 4", romType: "SleepOS", version: "v2.2.8", date: "2025-10-25", changelog: "# v2.2.8\n- Fixed camera issues\n- Improved stability", status: "Published" },
    ];
    localStorage.setItem(STORAGE_KEYS.CHANGELOGS, JSON.stringify(defaultChangelogs));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    const defaultSettings: SiteSettings = {
      siteName: "Project Sleep",
      siteDescription: "Custom ROMs crafted with care for the community.",
      contactEmail: "contact@projectsleep.com",
      discordLink: "https://discord.gg/sK433E4jq",
      telegramLink: "https://t.me/SleepOsUser",
      downloadServer: "https://downloads.projectsleep.com",
      enableDownloads: true,
      enableTeamApplications: true,
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  }
};

// Initialize storage
initializeStorage();

// Device functions
export const getDevices = (): Device[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DEVICES);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing devices from localStorage:', error);
    // If parsing fails, return empty array and clear the corrupted data
    localStorage.removeItem(STORAGE_KEYS.DEVICES);
    return [];
  }
};

export const addDevice = (device: Omit<Device, 'id' | 'roms' | 'lastUpdate'>): Device => {
  const devices = getDevices();
  const newDevice: Device = {
    ...device,
    id: Math.max(0, ...devices.map(d => d.id)) + 1,
    roms: [],
    lastUpdate: new Date().toISOString().split('T')[0],
  };
  localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify([...devices, newDevice]));
  return newDevice;
};

export const updateDevice = (device: Device): Device => {
  const devices = getDevices();
  const updatedDevices = devices.map(d => d.id === device.id ? device : d);
  localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(updatedDevices));
  return device;
};

export const deleteDevice = (id: number): boolean => {
  const devices = getDevices();
  const updatedDevices = devices.filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(updatedDevices));
  return true;
};

// ROM functions within devices
export const getRoms = (): Rom[] => {
  const devices = getDevices();
  return devices.flatMap(device => Array.isArray(device.roms) ? device.roms : []);
};

export const getRomsForDevice = (deviceCodename: string): Rom[] => {
  const devices = getDevices();
  const device = devices.find(d => d.codename === deviceCodename);
  if (device && Array.isArray(device.roms)) {
    return device.roms;
  }
  return [];
};

export const addRomToDevice = (deviceCodename: string, rom: Omit<Rom, 'id' | 'downloads' | 'deviceCodename'>): Rom | null => {
  const devices = getDevices();
  const deviceIndex = devices.findIndex(d => d.codename === deviceCodename);

  if (deviceIndex === -1) return null;

  // Ensure the roms array exists
  if (!Array.isArray(devices[deviceIndex].roms)) {
    devices[deviceIndex].roms = [];
  }

  const allRoms = getRoms();
  const newRom: Rom = {
    ...rom,
    deviceCodename,
    id: Math.max(0, ...allRoms.map(r => r.id)) + 1,
    downloads: 0,
  };

  devices[deviceIndex].roms.push(newRom);
  devices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
  localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));

  return newRom;
};

export const updateRomForDevice = (deviceCodename: string, rom: Rom): Rom | null => {
  const devices = getDevices();
  const deviceIndex = devices.findIndex(d => d.codename === deviceCodename);

  if (deviceIndex === -1) return null;

  // Ensure the roms array exists
  if (!Array.isArray(devices[deviceIndex].roms)) {
    devices[deviceIndex].roms = [];
    return null;
  }

  const romIndex = devices[deviceIndex].roms.findIndex(r => r.id === rom.id);

  if (romIndex === -1) return null;

  devices[deviceIndex].roms[romIndex] = rom;
  devices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
  localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));

  return rom;
};

export const deleteRomFromDevice = (deviceCodename: string, romId: number): boolean => {
  const devices = getDevices();
  const deviceIndex = devices.findIndex(d => d.codename === deviceCodename);

  if (deviceIndex === -1) return false;

  // Ensure the roms array exists
  if (!Array.isArray(devices[deviceIndex].roms)) {
    devices[deviceIndex].roms = [];
    return false;
  }

  const initialRomCount = devices[deviceIndex].roms.length;
  devices[deviceIndex].roms = devices[deviceIndex].roms.filter(rom => rom.id !== romId);

  if (initialRomCount !== devices[deviceIndex].roms.length) {
    devices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
    return true;
  }

  return false;
};

// Maintaining backward compatibility for admin panel
// These functions now need to work with the new data structure
export const addRom = (rom: Omit<Rom, 'id' | 'downloads' | 'deviceCodename'>): Rom => {
  // Find the device codename if not provided
  let deviceCodename = rom.deviceCodename;
  if (!deviceCodename && rom.device) {
    // Try to find codename from device name
    const devices = getDevices();
    const device = devices.find(d => d.name === rom.device);
    if (device) {
      deviceCodename = device.codename;
    }
  }

  if (!deviceCodename) {
    // If we still don't have a device codename, return a dummy ROM to prevent crashes
    return {
      ...rom,
      deviceCodename: rom.device || "unknown",
      id: Date.now(), // temporary ID
      downloads: 0
    };
  }

  const devices = getDevices();
  const deviceIndex = devices.findIndex(d => d.codename === deviceCodename);

  if (deviceIndex === -1) {
    // If device doesn't exist, we might need to create it or handle the error
    // For now, return a dummy ROM to prevent crashes
    return {
      ...rom,
      deviceCodename,
      id: Date.now(), // temporary ID
      downloads: 0
    };
  }

  // Ensure the roms array exists
  if (!Array.isArray(devices[deviceIndex].roms)) {
    devices[deviceIndex].roms = [];
  }

  const allRoms = getRoms();
  const newRom: Rom = {
    ...rom,
    deviceCodename,
    id: Math.max(0, ...allRoms.map(r => r.id)) + 1,
    downloads: 0,
  };

  devices[deviceIndex].roms.push(newRom);
  devices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
  localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));

  return newRom;
};

export const updateRom = (rom: Rom): Rom => {
  const devices = getDevices();

  // Find the device that contains this ROM
  for (let i = 0; i < devices.length; i++) {
    const device = devices[i];

    // Ensure roms is an array
    if (!Array.isArray(device.roms)) {
      device.roms = [];
    }

    const romIndex = device.roms.findIndex(r => r.id === rom.id);

    if (romIndex !== -1) {
      device.roms[romIndex] = rom;
      device.lastUpdate = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
      return rom;
    }
  }

  // If ROM not found, try to add it to the appropriate device
  if (rom.deviceCodename) {
    const deviceIndex = devices.findIndex(d => d.codename === rom.deviceCodename);
    if (deviceIndex !== -1) {
      if (!Array.isArray(devices[deviceIndex].roms)) {
        devices[deviceIndex].roms = [];
      }
      devices[deviceIndex].roms.push(rom);
      devices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
      return rom;
    }
  }

  // If ROM not found and no deviceCodename, return it as is
  return rom;
};

export const deleteRom = (id: number): boolean => {
  const devices = getDevices();

  for (let i = 0; i < devices.length; i++) {
    const device = devices[i];

    // Ensure roms is an array
    if (!Array.isArray(device.roms)) {
      device.roms = [];
    }

    const initialRomCount = device.roms.length;
    device.roms = device.roms.filter(rom => rom.id !== id);

    if (initialRomCount !== device.roms.length) {
      device.lastUpdate = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
      return true;
    }
  }

  return false;
};

// Get devices with active ROMs only
export const getActiveDevices = (): Device[] => {
  const devices = getDevices();
  return devices.filter(device => {
    // Check if device is active and has roms as an array
    if (device.status !== 'Active' || !device.roms || !Array.isArray(device.roms)) {
      return false;
    }
    // Check if at least one ROM is active
    return device.roms.some(rom => rom.status === 'Active');
  });
};

// Application functions
export const getApplications = (): Application[] => {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing applications from localStorage:', error);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    return [];
  }
};

export const addApplication = (application: Omit<Application, 'id' | 'date' | 'status'>): Application => {
  const applications = getApplications();
  const newApplication: Application = {
    ...application,
    id: Math.max(0, ...applications.map(a => a.id)) + 1,
    date: new Date().toISOString().split('T')[0],
    status: "Pending",
  };
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([...applications, newApplication]));
  return newApplication;
};

export const updateApplication = (application: Application): Application => {
  const applications = getApplications();
  const updatedApplications = applications.map(a => a.id === application.id ? application : a);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updatedApplications));
  return application;
};

// Changelog functions
export const getChangelogs = (): Changelog[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CHANGELOGS);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing changelogs from localStorage:', error);
    localStorage.removeItem(STORAGE_KEYS.CHANGELOGS);
    return [];
  }
};

export const addChangelog = (changelog: Omit<Changelog, 'id'>): Changelog => {
  const changelogs = getChangelogs();
  const newChangelog: Changelog = {
    ...changelog,
    id: Math.max(0, ...changelogs.map(c => c.id)) + 1,
  };
  localStorage.setItem(STORAGE_KEYS.CHANGELOGS, JSON.stringify([...changelogs, newChangelog]));
  return newChangelog;
};

export const updateChangelog = (changelog: Changelog): Changelog => {
  const changelogs = getChangelogs();
  const updatedChangelogs = changelogs.map(c => c.id === changelog.id ? changelog : c);
  localStorage.setItem(STORAGE_KEYS.CHANGELOGS, JSON.stringify(updatedChangelogs));
  return changelog;
};

export const deleteChangelog = (id: number): boolean => {
  const changelogs = getChangelogs();
  const updatedChangelogs = changelogs.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CHANGELOGS, JSON.stringify(updatedChangelogs));
  return true;
};

// Settings functions
export const getSettings = (): SiteSettings => {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (!data) {
    return {
      siteName: "Project Sleep",
      siteDescription: "Custom ROMs crafted with care for the community.",
      contactEmail: "contact@projectsleep.com",
      discordLink: "https://discord.gg/sK433E4jq",
      telegramLink: "https://t.me/SleepOsUser",
      downloadServer: "https://downloads.projectsleep.com",
      enableDownloads: true,
      enableTeamApplications: true,
    };
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing settings from localStorage:', error);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    return {
      siteName: "Project Sleep",
      siteDescription: "Custom ROMs crafted with care for the community.",
      contactEmail: "contact@projectsleep.com",
      discordLink: "https://discord.gg/sK433E4jq",
      telegramLink: "https://t.me/SleepOsUser",
      downloadServer: "https://downloads.projectsleep.com",
      enableTeamApplications: true,
    };
  }
};

export const updateSettings = (settings: SiteSettings): SiteSettings => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  return settings;
};

// User functions
export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return null;
  }
};

export const updateUser = (user: User): User => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return user;
};

// Helper functions
export const updateDownloadCount = (romId: number): void => {
  const devices = getDevices();
  let found = false;

  for (const device of devices) {
    const romIndex = device.roms.findIndex(r => r.id === romId);
    if (romIndex !== -1) {
      device.roms[romIndex].downloads += 1;
      found = true;
      break;
    }
  }

  if (found) {
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
  }
};