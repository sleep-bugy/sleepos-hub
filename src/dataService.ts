// dataService.ts
import { Device, Rom, Application, Changelog, SiteSettings, User } from './types';
import { dbOperations } from './lib/database';

// Device functions
export const getDevices = async (): Promise<Device[]> => {
  try {
    const devices = await dbOperations.devices.getAll();
    // Map the database response to fit the Device type expected by the app
    return devices.map(device => ({
      id: device.id,
      name: device.name,
      codename: device.codename,
      status: device.status as 'Active' | 'Inactive',
      lastUpdate: device.last_update,
      roms: device.roms || [] // Default to empty array if null
    }));
  } catch (error) {
    console.error('Error fetching devices:', error);
    // Return empty array in case of error
    return [];
  }
};

export const addDevice = async (device: Omit<Device, 'id' | 'roms' | 'lastUpdate'>): Promise<Device> => {
  try {
    const result = await dbOperations.devices.create(device);
    return {
      id: result.id,
      name: result.name,
      codename: result.codename,
      status: result.status as 'Active' | 'Inactive',
      lastUpdate: result.last_update,
      roms: result.roms || []
    };
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};

export const updateDevice = async (device: Device): Promise<Device> => {
  try {
    const result = await dbOperations.devices.update(device.id, device);
    return {
      id: result.id,
      name: result.name,
      codename: result.codename,
      status: result.status as 'Active' | 'Inactive',
      lastUpdate: result.last_update,
      roms: result.roms || []
    };
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
};

export const deleteDevice = async (id: number): Promise<boolean> => {
  try {
    await dbOperations.devices.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting device:', error);
    return false;
  }
};

// ROM functions within devices
export const getRoms = async (): Promise<Rom[]> => {
  try {
    const roms = await dbOperations.roms.getAll();
    // Map the database response to fit the Rom type expected by the app
    return roms.map(rom => ({
      id: rom.id,
      device: rom.device || "", // Default to empty string if null
      deviceCodename: rom.device_codename,
      maintainer: rom.maintainer,
      romType: rom.rom_type as 'SleepOS' | 'AOSP' | 'Port',
      version: rom.version,
      size: rom.size,
      downloads: rom.downloads || 0,
      status: rom.status as 'Active' | 'Inactive',
      uploadDate: rom.upload_date,
      downloadUrl: rom.download_url,
      changelog: rom.changelog,
      notes: rom.notes || undefined
    }));
  } catch (error) {
    console.error('Error fetching roms:', error);
    return [];
  }
};

export const getRomsForDevice = async (deviceCodename: string): Promise<Rom[]> => {
  try {
    const roms = await dbOperations.roms.getByDevice(deviceCodename);
    // Map the database response to fit the Rom type expected by the app
    return roms.map(rom => ({
      id: rom.id,
      device: rom.device || "", // Default to empty string if null
      deviceCodename: rom.device_codename,
      maintainer: rom.maintainer,
      romType: rom.rom_type as 'SleepOS' | 'AOSP' | 'Port',
      version: rom.version,
      size: rom.size,
      downloads: rom.downloads || 0,
      status: rom.status as 'Active' | 'Inactive',
      uploadDate: rom.upload_date,
      downloadUrl: rom.download_url,
      changelog: rom.changelog,
      notes: rom.notes || undefined
    }));
  } catch (error) {
    console.error('Error fetching roms for device:', error);
    return [];
  }
};

export const addRomToDevice = async (deviceCodename: string, rom: Omit<Rom, 'id' | 'downloads' | 'deviceCodename'>): Promise<Rom | null> => {
  try {
    const romData = {
      deviceCodename: deviceCodename,
      romType: rom.romType,
      version: rom.version,
      size: rom.size,
      maintainer: rom.maintainer,
      downloadUrl: rom.downloadUrl,
      changelog: rom.changelog,
      notes: rom.notes,
      status: rom.status,
      uploadDate: rom.uploadDate
    };

    const result = await dbOperations.roms.create(romData);
    return {
      id: result.id,
      device: result.device || "",
      deviceCodename: result.device_codename,
      maintainer: result.maintainer,
      romType: result.rom_type as 'SleepOS' | 'AOSP' | 'Port',
      version: result.version,
      size: result.size,
      downloads: result.downloads || 0,
      status: result.status as 'Active' | 'Inactive',
      uploadDate: result.upload_date,
      downloadUrl: result.download_url,
      changelog: result.changelog,
      notes: result.notes || undefined
    };
  } catch (error) {
    console.error('Error adding rom to device:', error);
    return null;
  }
};

export const updateRomForDevice = async (deviceCodename: string, rom: Rom): Promise<Rom | null> => {
  // The database operations don't currently support updating ROMs directly
  // This would need to be implemented in the dbOperations
  console.error('updateRomForDevice not implemented in database operations');
  return null;
};

export const deleteRomFromDevice = async (deviceCodename: string, romId: number): Promise<boolean> => {
  // The database operations don't currently support deleting ROMs directly
  // This would need to be implemented in the dbOperations
  console.error('deleteRomFromDevice not implemented in database operations');
  return false;
};

// Maintaining backward compatibility for admin panel
// These functions now need to work with the new data structure
export const addRom = async (rom: Omit<Rom, 'id' | 'downloads' | 'deviceCodename'>): Promise<Rom> => {
  // Find the device codename if not provided
  let deviceCodename = rom.deviceCodename;
  if (!deviceCodename && rom.device) {
    // Try to find codename from device name
    const devices = await getDevices();
    const device = devices.find(d => d.name === rom.device);
    if (device) {
      deviceCodename = device.codename;
    }
  }

  if (!deviceCodename) {
    // If we still don't have a device codename, throw an error
    throw new Error('Device codename is required to add a ROM');
  }

  const result = await addRomToDevice(deviceCodename, rom);
  if (!result) {
    throw new Error('Failed to add ROM to device');
  }
  return result;
};

export const updateRom = async (rom: Rom): Promise<Rom> => {
  // The database operations don't support updating individual ROMs directly
  // This would need to be implemented in the dbOperations
  console.error('updateRom not implemented in database operations');
  throw new Error('updateRom not implemented in database operations');
};

export const deleteRom = async (id: number): Promise<boolean> => {
  // The database operations don't support deleting individual ROMs directly
  // This would need to be implemented in the dbOperations
  console.error('deleteRom not implemented in database operations');
  return false;
};

// Get devices with active ROMs only
export const getActiveDevices = async (): Promise<Device[]> => {
  const devices = await getDevices();
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
export const getApplications = async (): Promise<Application[]> => {
  try {
    const applications = await dbOperations.applications.getAll();
    // Map the database response to fit the Application type expected by the app
    return applications.map(app => ({
      id: app.id,
      name: app.name,
      email: app.email,
      role: app.role,
      portfolio: app.portfolio,
      message: app.message,
      status: app.status as 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected',
      date: app.date,
      cv: app.cv || undefined
    }));
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

export const addApplication = async (application: Omit<Application, 'id' | 'date' | 'status'>): Promise<Application> => {
  try {
    const appData = {
      name: application.name,
      email: application.email,
      role: application.role,
      portfolio: application.portfolio,
      message: application.message,
      cv: application.cv
    };

    const result = await dbOperations.applications.create(appData);
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      portfolio: result.portfolio,
      message: result.message,
      status: result.status as 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected',
      date: result.date,
      cv: result.cv || undefined
    };
  } catch (error) {
    console.error('Error adding application:', error);
    throw error;
  }
};

export const updateApplication = async (application: Application): Promise<Application> => {
  try {
    const result = await dbOperations.applications.update(application.id, application);
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      portfolio: result.portfolio,
      message: result.message,
      status: result.status as 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected',
      date: result.date,
      cv: result.cv || undefined
    };
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};

// Changelog functions
export const getChangelogs = async (): Promise<Changelog[]> => {
  try {
    const changelogs = await dbOperations.changelogs.getAll();
    // Map the database response to fit the Changelog type expected by the app
    return changelogs.map(changelog => ({
      id: changelog.id,
      device: changelog.device,
      romType: changelog.rom_type as 'SleepOS' | 'AOSP' | 'Port',
      version: changelog.version,
      date: changelog.date,
      changelog: changelog.changelog,
      status: changelog.status as 'Draft' | 'Published'
    }));
  } catch (error) {
    console.error('Error fetching changelogs:', error);
    return [];
  }
};

export const addChangelog = async (changelog: Omit<Changelog, 'id'>): Promise<Changelog> => {
  try {
    const changelogData = {
      device: changelog.device,
      romType: changelog.romType,
      version: changelog.version,
      date: changelog.date,
      changelog: changelog.changelog,
      status: changelog.status
    };

    const result = await dbOperations.changelogs.create(changelogData);
    return {
      id: result.id,
      device: result.device,
      romType: result.rom_type as 'SleepOS' | 'AOSP' | 'Port',
      version: result.version,
      date: result.date,
      changelog: result.changelog,
      status: result.status as 'Draft' | 'Published'
    };
  } catch (error) {
    console.error('Error adding changelog:', error);
    throw error;
  }
};

export const updateChangelog = async (changelog: Changelog): Promise<Changelog> => {
  // The database operations don't currently support updating changelogs directly
  // This would need to be implemented in the dbOperations
  console.error('updateChangelog not implemented in database operations');
  throw new Error('updateChangelog not implemented in database operations');
};

export const deleteChangelog = async (id: number): Promise<boolean> => {
  // The database operations don't currently support deleting changelogs directly
  // This would need to be implemented in the dbOperations
  console.error('deleteChangelog not implemented in database operations');
  return false;
};

// Settings functions
export const getSettings = async (): Promise<SiteSettings> => {
  try {
    const settings = await dbOperations.settings.get();
    return {
      siteName: settings.site_name,
      siteDescription: settings.site_description,
      contactEmail: settings.contact_email,
      discordLink: settings.discord_link,
      telegramLink: settings.telegram_link,
      downloadServer: settings.download_server,
      enableDownloads: settings.enable_downloads,
      enableTeamApplications: settings.enable_team_applications,
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return default settings in case of error
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
};

export const updateSettings = async (settings: SiteSettings): Promise<SiteSettings> => {
  try {
    const settingsData = {
      site_name: settings.siteName,
      site_description: settings.siteDescription,
      contact_email: settings.contactEmail,
      discord_link: settings.discordLink,
      telegram_link: settings.telegramLink,
      download_server: settings.downloadServer,
      enable_downloads: settings.enableDownloads,
      enable_team_applications: settings.enableTeamApplications,
    };

    const result = await dbOperations.settings.update(settingsData);
    return {
      siteName: result.site_name,
      siteDescription: result.site_description,
      contactEmail: result.contact_email,
      discordLink: result.discord_link,
      telegramLink: result.telegram_link,
      downloadServer: result.download_server,
      enableDownloads: result.enable_downloads,
      enableTeamApplications: result.enable_team_applications,
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

// User functions
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const user = await dbOperations.users.get();
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role as 'admin' | 'moderator' | 'user'
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const userData = {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role
    };

    const result = await dbOperations.users.update(userData);
    return {
      id: result.id,
      email: result.email,
      password: result.password,
      role: result.role as 'admin' | 'moderator' | 'user'
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Helper functions
export const updateDownloadCount = async (romId: number): Promise<void> => {
  // For now, this is still mocked as download counting would require backend implementation
  // This would typically update the download count in the backend
};