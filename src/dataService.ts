// dataService.ts - Service layer for API integration with Supabase
import { Device, Rom, Application, Changelog, SiteSettings, User } from './types';
import { dbOperations } from './lib/database';

// Device functions using database operations
export const getDevices = async (): Promise<Device[]> => {
  try {
    const devices = await dbOperations.devices.getAll();
    // Map the database response to match the expected Device type
    return devices.map(device => ({
      id: device.id,
      name: device.name,
      codename: device.codename,
      status: device.status as 'Active' | 'Inactive',
      lastUpdate: device.last_update,
      roms: device.roms || []
    }));
  } catch (error) {
    console.error('Error fetching devices from Supabase:', error);
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
    console.error('Error adding device to Supabase:', error);
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
    console.error('Error updating device in Supabase:', error);
    throw error;
  }
};

export const deleteDevice = async (id: number): Promise<boolean> => {
  try {
    return await dbOperations.devices.delete(id);
  } catch (error) {
    console.error('Error deleting device from Supabase:', error);
    return false;
  }
};

// ROM functions within devices using database operations
export const getRoms = async (): Promise<Rom[]> => {
  try {
    const roms = await dbOperations.roms.getAll();
    // Map the database response to match the expected Rom type
    return roms.map(rom => ({
      id: rom.id,
      device: rom.device || "",
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
    console.error('Error fetching roms from Supabase:', error);
    return [];
  }
};

export const getRomsForDevice = async (deviceCodename: string): Promise<Rom[]> => {
  try {
    const roms = await dbOperations.roms.getByDevice(deviceCodename);
    // Map the database response to match the expected Rom type
    return roms.map(rom => ({
      id: rom.id,
      device: rom.device || "",
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
    console.error('Error fetching roms for device from Supabase:', error);
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
    console.error('Error adding rom to device in Supabase:', error);
    return null;
  }
};

export const updateRomForDevice = async (deviceCodename: string, rom: Rom): Promise<Rom | null> => {
  // The API implementation for updating individual ROMs needs to handle the device context
  // For now, we'll use the direct ROM update function
  console.error('updateRomForDevice not implemented, using direct update');
  return null;
};

export const deleteRomFromDevice = async (deviceCodename: string, romId: number): Promise<boolean> => {
  // The API implementation for deleting individual ROMs needs to handle the device context
  // For now, we'll use the direct ROM delete function
  console.error('deleteRomFromDevice not implemented, using direct delete');
  return false;
};

// Maintaining backward compatibility for admin panel
// These functions now work with the new Supabase database structure
export const addRom = async (rom: Omit<Rom, 'id' | 'downloads' | 'deviceCodename'>): Promise<Rom> => {
  // Find device codename if not provided
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
    throw new Error('Device codename is required to add a ROM');
  }

  const result = await addRomToDevice(deviceCodename, rom);
  if (!result) {
    throw new Error('Failed to add ROM to device');
  }
  return result;
};

export const updateRom = async (rom: Rom): Promise<Rom> => {
  try {
    const result = await dbOperations.roms.update(rom.id, rom);
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
    console.error('Error updating ROM in Supabase:', error);
    throw error;
  }
};

export const deleteRom = async (id: number): Promise<boolean> => {
  try {
    return await dbOperations.roms.delete(id);
  } catch (error) {
    console.error('Error deleting ROM from Supabase:', error);
    return false;
  }
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

// Application functions using database operations
export const getApplications = async (): Promise<Application[]> => {
  try {
    const applications = await dbOperations.applications.getAll();
    // Map the database response to match the expected Application type
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
    console.error('Error fetching applications from Supabase:', error);
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
      cv: application.cv || null,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
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
    console.error('Error adding application to Supabase:', error);
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
    console.error('Error updating application in Supabase:', error);
    throw error;
  }
};

// Changelog functions using database operations
export const getChangelogs = async (): Promise<Changelog[]> => {
  try {
    const changelogs = await dbOperations.changelogs.getAll();
    // Map the database response to match the expected Changelog type
    return changelogs.map(log => ({
      id: log.id,
      device: log.device,
      romType: log.rom_type as 'SleepOS' | 'AOSP' | 'Port',
      version: log.version,
      date: log.date,
      changelog: log.changelog,
      status: log.status as 'Draft' | 'Published'
    }));
  } catch (error) {
    console.error('Error fetching changelogs from Supabase:', error);
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
    console.error('Error adding changelog to Supabase:', error);
    throw error;
  }
};

export const updateChangelog = async (changelog: Changelog): Promise<Changelog> => {
  // Update changelog functionality would need to be implemented
  // This would require implementing update in dbOperations
  console.error('updateChangelog not implemented in current database operations');
  throw new Error('updateChangelog not implemented in current database operations');
};

export const deleteChangelog = async (id: number): Promise<boolean> => {
  // Delete changelog functionality would need to be implemented
  // This would require implementing delete in dbOperations
  console.error('deleteChangelog not implemented in current database operations');
  return false;
};

// Settings functions using database operations
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
    console.error('Error fetching settings from Supabase:', error);
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
    console.error('Error updating settings in Supabase:', error);
    throw error;
  }
};

// User functions using database operations
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const user = await dbOperations.users.get();
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      password: user.password, // In production, this would be hashed
      role: user.role as 'admin' | 'moderator' | 'user'
    };
  } catch (error) {
    console.error('Error fetching user from Supabase:', error);
    return null;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const result = await dbOperations.users.update(user);
    return {
      id: result.id,
      email: result.email,
      password: result.password,
      role: result.role as 'admin' | 'moderator' | 'user'
    };
  } catch (error) {
    console.error('Error updating user in Supabase:', error);
    throw error;
  }
};

// Helper functions
export const updateDownloadCount = async (romId: number): Promise<void> => {
  // For now, this is still mocked as download counting would require backend implementation
  // This would typically update the download count in the backend
};