// Database configuration for Supabase integration using direct fetch
// This approach works better with Vercel Edge Functions

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Function to make API calls to Supabase REST API
async function supabaseRequest(path: string, options: RequestInit = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Database operations using direct fetch to Supabase REST API
export const dbOperations = {
  devices: {
    // Get all devices
    getAll: async () => {
      try {
        const data = await supabaseRequest('devices?select=*');
        return data || [];
      } catch (error) {
        console.error('Error fetching devices:', error);
        return [];
      }
    },

    // Create a new device
    create: async (deviceData) => {
      try {
        const [data] = await supabaseRequest('devices', {
          method: 'POST',
          body: JSON.stringify({
            name: deviceData.name,
            codename: deviceData.codename,
            status: deviceData.status,
            last_update: new Date().toISOString().split('T')[0],
            roms: [] // Initialize with empty ROMs array
          }),
          headers: {
            'Prefer': 'return=representation'
          }
        });
        return data;
      } catch (error) {
        console.error('Error creating device:', error);
        throw error;
      }
    },

    // Update a device
    update: async (id, deviceData) => {
      try {
        const [data] = await supabaseRequest(`devices?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: deviceData.name,
            codename: deviceData.codename,
            status: deviceData.status,
            last_update: new Date().toISOString().split('T')[0]
          }),
          headers: {
            'Prefer': 'return=representation'
          }
        });
        return data;
      } catch (error) {
        console.error('Error updating device:', error);
        throw error;
      }
    },

    // Delete a device
    delete: async (id) => {
      try {
        await supabaseRequest(`devices?id=eq.${id}`, {
          method: 'DELETE',
        });
        return true;
      } catch (error) {
        console.error('Error deleting device:', error);
        throw error;
      }
    }
  },

  roms: {
    // Get all ROMs
    getAll: async () => {
      try {
        const data = await supabaseRequest('roms?select=*');
        return data || [];
      } catch (error) {
        console.error('Error fetching ROMs:', error);
        return [];
      }
    },

    // Get ROMs for specific device
    getByDevice: async (deviceCodename) => {
      try {
        const data = await supabaseRequest(`roms?device_codename=eq.${deviceCodename}&select=*`);
        return data || [];
      } catch (error) {
        console.error('Error fetching ROMs for device:', error);
        return [];
      }
    },

    // Create a new ROM
    create: async (romData) => {
      try {
        const [data] = await supabaseRequest('roms', {
          method: 'POST',
          body: JSON.stringify({
            device_codename: romData.deviceCodename,
            rom_type: romData.romType,
            version: romData.version,
            size: romData.size,
            maintainer: romData.maintainer,
            download_url: romData.downloadUrl,
            changelog: romData.changelog,
            notes: romData.notes,
            status: romData.status,
            upload_date: romData.uploadDate,
            downloads: 0 // Initialize with 0 downloads
          }),
          headers: {
            'Prefer': 'return=representation'
          }
        });
        return data;
      } catch (error) {
        console.error('Error creating ROM:', error);
        throw error;
      }
    }
  },

  applications: {
    getAll: async () => {
      try {
        const data = await supabaseRequest('applications?select=*');
        return data || [];
      } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
      }
    },

    create: async (appData) => {
      try {
        const [data] = await supabaseRequest('applications', {
          method: 'POST',
          body: JSON.stringify({
            name: appData.name,
            email: appData.email,
            role: appData.role,
            portfolio: appData.portfolio,
            message: appData.message,
            cv: appData.cv,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
          }),
          headers: {
            'Prefer': 'return=representation'
          }
        });
        return data;
      } catch (error) {
        console.error('Error creating application:', error);
        throw error;
      }
    },

    update: async (id, appData) => {
      try {
        const [data] = await supabaseRequest(`applications?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: appData.name,
            email: appData.email,
            role: appData.role,
            portfolio: appData.portfolio,
            message: appData.message,
            cv: appData.cv,
            status: appData.status
          }),
          headers: {
            'Prefer': 'return=representation'
          }
        });
        return data;
      } catch (error) {
        console.error('Error updating application:', error);
        throw error;
      }
    }
  },

  changelogs: {
    getAll: async () => {
      try {
        const data = await supabaseRequest('changelogs?select=*');
        return data || [];
      } catch (error) {
        console.error('Error fetching changelogs:', error);
        return [];
      }
    },

    create: async (changelogData) => {
      try {
        const [data] = await supabaseRequest('changelogs', {
          method: 'POST',
          body: JSON.stringify({
            device: changelogData.device,
            rom_type: changelogData.romType,
            version: changelogData.version,
            date: changelogData.date,
            changelog: changelogData.changelog,
            status: changelogData.status
          }),
          headers: {
            'Prefer': 'return=representation'
          }
        });
        return data;
      } catch (error) {
        console.error('Error creating changelog:', error);
        throw error;
      }
    }
  },

  settings: {
    get: async () => {
      try {
        const [data] = await supabaseRequest('settings?select=*', {
          method: 'GET'
        });

        if (!data) {
          // Return default settings if not found
          return {
            id: 1,
            site_name: "Project Sleep",
            site_description: "Custom ROMs crafted with care for the community.",
            contact_email: "contact@projectsleep.com",
            discord_link: "https://discord.gg/sK433E4jq",
            telegram_link: "https://t.me/SleepOsUser",
            download_server: "https://downloads.projectsleep.com",
            enable_downloads: true,
            enable_team_applications: true,
          };
        }

        return data;
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Return default settings
        return {
          id: 1,
          site_name: "Project Sleep",
          site_description: "Custom ROMs crafted with care for the community.",
          contact_email: "contact@projectsleep.com",
          discord_link: "https://discord.gg/sK433E4jq",
          telegram_link: "https://t.me/SleepOsUser",
          download_server: "https://downloads.projectsleep.com",
          enable_downloads: true,
          enable_team_applications: true,
        };
      }
    },

    update: async (settingsData) => {
      try {
        // For settings, we'll use upsert based on ID
        const [data] = await supabaseRequest('settings', {
          method: 'POST',
          body: JSON.stringify({
            id: 1,
            ...settingsData
          }),
          headers: {
            'Prefer': 'return=representation, resolution=merge-duplicates'
          }
        });
        return data;
      } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
      }
    }
  },

  users: {
    get: async () => {
      try {
        const [data] = await supabaseRequest('users?select=*&limit=1', {
          method: 'GET'
        });
        return data;
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    },

    update: async (userData) => {
      try {
        const [data] = await supabaseRequest('users', {
          method: 'POST',
          body: JSON.stringify({
            id: userData.id,
            email: userData.email,
            password: userData.password, // In production, this should be hashed
            role: userData.role
          }),
          headers: {
            'Prefer': 'return=representation, resolution=merge-duplicates'
          }
        });
        return data;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  }
};
