// Database configuration for Supabase integration
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database operations
export const dbOperations = {
  devices: {
    // Get all devices
    getAll: async () => {
      try {
        const { data, error } = await supabase
          .from('devices')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching devices:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error fetching devices:', error);
        return [];
      }
    },

    // Create a new device
    create: async (deviceData) => {
      try {
        const { data, error } = await supabase
          .from('devices')
          .insert([{
            name: deviceData.name,
            codename: deviceData.codename,
            status: deviceData.status,
            last_update: new Date().toISOString().split('T')[0],
            roms: [] // Initialize with empty ROMs array
          }])
          .select()
          .single();

        if (error) {
          console.error('Error creating device:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error creating device:', error);
        throw error;
      }
    },

    // Update a device
    update: async (id, deviceData) => {
      try {
        const { data, error } = await supabase
          .from('devices')
          .update({
            name: deviceData.name,
            codename: deviceData.codename,
            status: deviceData.status,
            last_update: new Date().toISOString().split('T')[0]
          })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('Error updating device:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error updating device:', error);
        throw error;
      }
    },

    // Delete a device
    delete: async (id) => {
      try {
        const { error } = await supabase
          .from('devices')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting device:', error);
          throw error;
        }

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
        const { data, error } = await supabase
          .from('roms')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching ROMs:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error fetching ROMs:', error);
        return [];
      }
    },

    // Get ROMs for specific device
    getByDevice: async (deviceCodename) => {
      try {
        const { data, error } = await supabase
          .from('roms')
          .select('*')
          .eq('device_codename', deviceCodename)
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching ROMs for device:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error fetching ROMs for device:', error);
        return [];
      }
    },

    // Create a new ROM
    create: async (romData) => {
      try {
        const { data, error } = await supabase
          .from('roms')
          .insert([{
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
          }])
          .select()
          .single();

        if (error) {
          console.error('Error creating ROM:', error);
          throw error;
        }

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
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching applications:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
      }
    },

    create: async (appData) => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .insert([{
            name: appData.name,
            email: appData.email,
            role: appData.role,
            portfolio: appData.portfolio,
            message: appData.message,
            cv: appData.cv,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
          }])
          .select()
          .single();

        if (error) {
          console.error('Error creating application:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error creating application:', error);
        throw error;
      }
    },

    update: async (id, appData) => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .update({
            name: appData.name,
            email: appData.email,
            role: appData.role,
            portfolio: appData.portfolio,
            message: appData.message,
            cv: appData.cv,
            status: appData.status
          })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('Error updating application:', error);
          throw error;
        }

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
        const { data, error } = await supabase
          .from('changelogs')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching changelogs:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error fetching changelogs:', error);
        return [];
      }
    },

    create: async (changelogData) => {
      try {
        const { data, error } = await supabase
          .from('changelogs')
          .insert([{
            device: changelogData.device,
            rom_type: changelogData.romType,
            version: changelogData.version,
            date: changelogData.date,
            changelog: changelogData.changelog,
            status: changelogData.status
          }])
          .select()
          .single();

        if (error) {
          console.error('Error creating changelog:', error);
          throw error;
        }

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
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .single();

        if (error) {
          console.error('Error fetching settings:', error);
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
        const { data, error } = await supabase
          .from('settings')
          .upsert([{
            id: 1,
            ...settingsData
          }])
          .select()
          .single();

        if (error) {
          console.error('Error updating settings:', error);
          throw error;
        }

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
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          return null;
        }

        return data;
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    },

    update: async (userData) => {
      try {
        const { data, error } = await supabase
          .from('users')
          .upsert([{
            id: userData.id,
            email: userData.email,
            password: userData.password, // In production, this should be hashed
            role: userData.role
          }])
          .select()
          .single();

        if (error) {
          console.error('Error updating user:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  }
};