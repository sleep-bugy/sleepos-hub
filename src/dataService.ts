// dataService.ts
import { Device, Rom, Application, Changelog, SiteSettings } from './types';

const STORAGE_KEYS = {
  DEVICES: 'ps_devices',
  ROMS: 'ps_roms',
  APPLICATIONS: 'ps_applications',
  CHANGELOGS: 'ps_changelogs',
  SETTINGS: 'ps_settings',
};

// Initialize with default data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.DEVICES)) {
    const defaultDevices: Device[] = [
      { id: 1, name: "Xiaomi Mi 9", codename: "cepheus", roms: 5, status: "Active", lastUpdate: "2025-11-15" },
      { id: 2, name: "OnePlus 7 Pro", codename: "guacamole", roms: 3, status: "Active", lastUpdate: "2025-11-10" },
      { id: 3, name: "Samsung Galaxy S10", codename: "beyond1lte", roms: 2, status: "Active", lastUpdate: "2025-11-12" },
      { id: 4, name: "Google Pixel 4", codename: "coral", roms: 4, status: "Inactive", lastUpdate: "2025-10-25" },
      { id: 5, name: "Huawei P30 Pro", codename: "elsa", roms: 1, status: "Active", lastUpdate: "2025-11-08" },
    ];
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(defaultDevices));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ROMS)) {
    const defaultRoms: Rom[] = [
      { id: 1, device: "Xiaomi Mi 9", deviceCodename: "cepheus", romType: "SleepOS", version: "v2.3.1", size: "1.2 GB", downloads: 1234, status: "Active", uploadDate: "2025-11-15", downloadUrl: "https://example.com/cepheus-sleepos-v2.3.1.zip", changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches" },
      { id: 2, device: "OnePlus 7 Pro", deviceCodename: "guacamole", romType: "AOSP", version: "v1.5.0", size: "980 MB", downloads: 892, status: "Active", uploadDate: "2025-11-10", downloadUrl: "https://example.com/guacamole-aosp-v1.5.0.zip", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates" },
      { id: 3, device: "Samsung Galaxy S10", deviceCodename: "beyond1lte", romType: "Port", version: "v3.0.2", size: "1.4 GB", downloads: 567, status: "Active", uploadDate: "2025-11-12", downloadUrl: "https://example.com/beyond1lte-port-v3.0.2.zip", changelog: "# v3.0.2\n- Ported OneUI features\n- Camera improvements" },
      { id: 4, device: "Google Pixel 4", deviceCodename: "coral", romType: "SleepOS", version: "v2.2.8", size: "1.1 GB", downloads: 421, status: "Inactive", uploadDate: "2025-10-25", downloadUrl: "https://example.com/coral-sleepos-v2.2.8.zip", changelog: "# v2.2.8\n- Fixed camera issues\n- Improved stability" },
      { id: 5, device: "Huawei P30 Pro", deviceCodename: "elsa", romType: "AOSP", version: "v1.2.0", size: "1.3 GB", downloads: 321, status: "Active", uploadDate: "2025-11-08", downloadUrl: "https://example.com/elsa-aosp-v1.2.0.zip", changelog: "# v1.2.0\n- Fixed connectivity issues\n- Improved battery life" },
    ];
    localStorage.setItem(STORAGE_KEYS.ROMS, JSON.stringify(defaultRoms));
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
      discordLink: "https://discord.gg/projectsleep",
      telegramLink: "https://t.me/projectsleep",
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
  return data ? JSON.parse(data) : [];
};

export const addDevice = (device: Omit<Device, 'id' | 'roms' | 'lastUpdate'>): Device => {
  const devices = getDevices();
  const newDevice: Device = {
    ...device,
    id: Math.max(0, ...devices.map(d => d.id)) + 1,
    roms: 0,
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
  const device = devices.find(d => d.id === id);
  if (!device) return false;
  
  // Also delete associated ROMs
  const roms = getRoms();
  const updatedRoms = roms.filter(r => r.deviceCodename !== device.codename);
  localStorage.setItem(STORAGE_KEYS.ROMS, JSON.stringify(updatedRoms));
  
  const updatedDevices = devices.filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(updatedDevices));
  return true;
};

// ROM functions
export const getRoms = (): Rom[] => {
  const data = localStorage.getItem(STORAGE_KEYS.ROMS);
  return data ? JSON.parse(data) : [];
};

export const addRom = (rom: Omit<Rom, 'id' | 'downloads'>): Rom => {
  const roms = getRoms();
  const newRom: Rom = {
    ...rom,
    id: Math.max(0, ...roms.map(r => r.id)) + 1,
    downloads: 0,
  };
  localStorage.setItem(STORAGE_KEYS.ROMS, JSON.stringify([...roms, newRom]));
  
  // Update device rom count
  const devices = getDevices();
  const deviceIndex = devices.findIndex(d => d.codename === rom.deviceCodename);
  if (deviceIndex !== -1) {
    devices[deviceIndex].roms += 1;
    devices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
  }
  
  return newRom;
};

export const updateRom = (rom: Rom): Rom => {
  const roms = getRoms();
  const updatedRoms = roms.map(r => r.id === rom.id ? rom : r);
  localStorage.setItem(STORAGE_KEYS.ROMS, JSON.stringify(updatedRoms));
  return rom;
};

export const deleteRom = (id: number): boolean => {
  const roms = getRoms();
  const rom = roms.find(r => r.id === id);
  if (!rom) return false;
  
  const updatedRoms = roms.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.ROMS, JSON.stringify(updatedRoms));
  
  // Update device rom count
  const devices = getDevices();
  const deviceIndex = devices.findIndex(d => d.codename === rom.deviceCodename);
  if (deviceIndex !== -1) {
    devices[deviceIndex].roms = Math.max(0, devices[deviceIndex].roms - 1);
    devices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
  }
  
  return true;
};

// Application functions
export const getApplications = (): Application[] => {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return data ? JSON.parse(data) : [];
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
  return data ? JSON.parse(data) : [];
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
  return data ? JSON.parse(data) : {
    siteName: "Project Sleep",
    siteDescription: "Custom ROMs crafted with care for the community.",
    contactEmail: "contact@projectsleep.com",
    discordLink: "https://discord.gg/projectsleep",
    telegramLink: "https://t.me/projectsleep",
    downloadServer: "https://downloads.projectsleep.com",
    enableDownloads: true,
    enableTeamApplications: true,
  };
};

export const updateSettings = (settings: SiteSettings): SiteSettings => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  return settings;
};

// Helper functions
export const updateDownloadCount = (romId: number): void => {
  const roms = getRoms();
  const romIndex = roms.findIndex(r => r.id === romId);
  if (romIndex !== -1) {
    roms[romIndex].downloads += 1;
    localStorage.setItem(STORAGE_KEYS.ROMS, JSON.stringify(roms));
  }
};