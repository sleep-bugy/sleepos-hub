// Database configuration for Supabase integration using the official Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database operations using Supabase client
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
    create: async (deviceData: any) => {
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
    update: async (id: number, deviceData: any) => {
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
    delete: async (id: number) => {
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
        return false;
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
    getByDevice: async (deviceCodename: string) => {
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
    
    // Add ROM to device 
    create: async (romData: any) => {
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
            upload_date: romData.uploadDate || new Date().toISOString().split('T')[0],
            downloads: 0
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
    // Get all applications
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
    
    // Create new application
    create: async (appData: any) => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .insert([{
            name: appData.name,
            email: appData.email,
            role: appData.role,
            portfolio: appData.portfolio,
            message: appData.message,
            cv: appData.cv || null,
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
    
    // Update application
    update: async (id: number, appData: any) => {
      try {
        const { data, error } = await supabase
          .from('applications')
          .update({
            name: appData.name,
            email: appData.email,
            role: appData.role,
            portfolio: appData.portfolio,
            message: appData.message,
            cv: appData.cv || null,
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
    // Get all changelogs
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
    
    // Create new changelog
    create: async (changelogData: any) => {
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
    // Get settings
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
    
    // Update settings
    update: async (settingsData: any) => {
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
    // Get current user
    get: async () => {
      try {
        // For demo purposes, returning a mock user
        // In production, this would be tied to authentication session
        return {
          id: 1,
          email: "admin@projectsleep.com",
          password: "admin123", // In production, this would be hashed
          role: "admin"
        };
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    },
    
    // Update user
    update: async (userData: any) => {
      try {
        // For demo purposes, just returning the user data
        // In production, this would update the user record in the DB
        return {
          ...userData,
          password: userData.password // In production, this would be hashed
        };
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  }
};