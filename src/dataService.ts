// dataService.ts - Service layer for API integration with backend endpoints
import { Device, Rom, Application, Changelog, SiteSettings, User } from './types';

// API base URL - will use relative paths for Vercel deployment
const API_BASE = '';

// Function to make API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    // No content response
    return null as T;
  }

  return await response.json();
}

// Device functions
export const getDevices = async (): Promise<Device[]> => {
  try {
    return await apiCall<Device[]>('/api/devices');
  } catch (error) {
    console.error('Error fetching devices:', error);
    // Return empty array in case of error
    return [];
  }
};

export const addDevice = async (device: Omit<Device, 'id' | 'roms' | 'lastUpdate'>): Promise<Device> => {
  try {
    return await apiCall<Device>('/api/devices', {
      method: 'POST',
      body: JSON.stringify({
        name: device.name,
        codename: device.codename,
        status: device.status,
      }),
    });
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};

export const updateDevice = async (device: Device): Promise<Device> => {
  try {
    return await apiCall<Device>(`/api/devices/${device.id}`, {
      method: 'PUT',
      body: JSON.stringify(device),
    });
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
};

export const deleteDevice = async (id: number): Promise<boolean> => {
  try {
    await apiCall(`/api/devices/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Error deleting device:', error);
    return false;
  }
};

// ROM functions within devices
export const getRoms = async (): Promise<Rom[]> => {
  try {
    return await apiCall<Rom[]>('/api/roms');
  } catch (error) {
    console.error('Error fetching roms:', error);
    return [];
  }
};

export const getRomsForDevice = async (deviceCodename: string): Promise<Rom[]> => {
  try {
    return await apiCall<Rom[]>(`/api/devices/${deviceCodename}/roms`);
  } catch (error) {
    console.error('Error fetching roms for device:', error);
    return [];
  }
};

export const addRomToDevice = async (deviceCodename: string, rom: Omit<Rom, 'id' | 'downloads' | 'deviceCodename'>): Promise<Rom | null> => {
  try {
    return await apiCall<Rom>(`/api/devices/${deviceCodename}/roms`, {
      method: 'POST',
      body: JSON.stringify(rom),
    });
  } catch (error) {
    console.error('Error adding rom to device:', error);
    return null;
  }
};

export const updateRomForDevice = async (deviceCodename: string, rom: Rom): Promise<Rom | null> => {
  // For now, this operation is not implemented in the API routes
  console.error('updateRomForDevice not implemented in API routes');
  return null;
};

export const deleteRomFromDevice = async (deviceCodename: string, romId: number): Promise<boolean> => {
  // For now, this operation is not implemented in the API routes
  console.error('deleteRomFromDevice not implemented in API routes');
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
  // The API routes don't support updating individual ROMs directly
  // This would need to be implemented in the API routes
  console.error('updateRom not implemented in API routes');
  throw new Error('updateRom not implemented in API routes');
};

export const deleteRom = async (id: number): Promise<boolean> => {
  // The API routes don't support deleting individual ROMs directly
  // This would need to be implemented in the API routes
  console.error('deleteRom not implemented in API routes');
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
    return await apiCall<Application[]>('/api/applications');
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

export const addApplication = async (application: Omit<Application, 'id' | 'date' | 'status'>): Promise<Application> => {
  try {
    return await apiCall<Application>('/api/applications', {
      method: 'POST',
      body: JSON.stringify(application),
    });
  } catch (error) {
    console.error('Error adding application:', error);
    throw error;
  }
};

export const updateApplication = async (application: Application): Promise<Application> => {
  try {
    return await apiCall<Application>(`/api/applications/${application.id}`, {
      method: 'PUT',
      body: JSON.stringify(application),
    });
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};

// Changelog functions
export const getChangelogs = async (): Promise<Changelog[]> => {
  try {
    return await apiCall<Changelog[]>('/api/changelogs');
  } catch (error) {
    console.error('Error fetching changelogs:', error);
    return [];
  }
};

export const addChangelog = async (changelog: Omit<Changelog, 'id'>): Promise<Changelog> => {
  try {
    return await apiCall<Changelog>('/api/changelogs', {
      method: 'POST',
      body: JSON.stringify(changelog),
    });
  } catch (error) {
    console.error('Error adding changelog:', error);
    throw error;
  }
};

export const updateChangelog = async (changelog: Changelog): Promise<Changelog> => {
  try {
    return await apiCall<Changelog>(`/api/changelogs/${changelog.id}`, {
      method: 'PUT',
      body: JSON.stringify(changelog),
    });
  } catch (error) {
    console.error('Error updating changelog:', error);
    throw error;
  }
};

export const deleteChangelog = async (id: number): Promise<boolean> => {
  try {
    await apiCall(`/api/changelogs/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Error deleting changelog:', error);
    return false;
  }
};

// Settings functions
export const getSettings = async (): Promise<SiteSettings> => {
  try {
    return await apiCall<SiteSettings>('/api/settings');
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
    return await apiCall<SiteSettings>('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

// User functions
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return await apiCall<User>('/api/user');
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    return await apiCall<User>('/api/user', {
      method: 'PUT',
      body: JSON.stringify(user),
    });
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