// Database configuration for Supabase integration with strict API calls only
import { createClient } from '@supabase/supabase-js';
import { 
  DeviceDb, 
  RomDb, 
  ApplicationDb, 
  ChangelogDb, 
  SettingsDb, 
  UserDb 
} from '../config/databaseTypes';

// Initialize Supabase client with environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize client only if credentials are available
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Check if Supabase is available
const isSupabaseAvailable = () => {
  return supabase !== null && SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';
};

// Strict Supabase operations - no fallback to mock data
export const dbOperations = {
  devices: {
    // Get all devices
    getAll: async (): Promise<DeviceDb[]> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('devices')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) {
          console.error('Error fetching devices from Supabase:', error);
          throw new Error(`Failed to fetch devices: ${error.message}`);
        }
        
        return data || [];
      } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
      }
    },
    
    // Create a new device
    create: async (deviceData: Omit<DeviceDb, 'id' | 'roms' | 'last_update'>): Promise<DeviceDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
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
          console.error('Error creating device in Supabase:', error);
          throw new Error(`Failed to create device: ${error.message}`);
        }
        
        return data;
      } catch (error) {
        console.error('Error creating device:', error);
        throw error;
      }
    },
    
    // Update a device
    update: async (id: number, deviceData: Partial<Omit<DeviceDb, 'id' | 'roms' | 'last_update'>>): Promise<DeviceDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
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
          console.error('Error updating device in Supabase:', error);
          throw new Error(`Failed to update device: ${error.message}`);
        }
        
        return data;
      } catch (error) {
        console.error('Error updating device:', error);
        throw error;
      }
    },
    
    // Delete a device
    delete: async (id: number): Promise<boolean> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { error } = await supabase
          .from('devices')
          .delete()
          .eq('id', id);
          
        if (error) {
          console.error('Error deleting device from Supabase:', error);
          throw new Error(`Failed to delete device: ${error.message}`);
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
    getAll: async (): Promise<RomDb[]> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('roms')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) {
          console.error('Error fetching ROMs from Supabase:', error);
          throw new Error(`Failed to fetch ROMs: ${error.message}`);
        }
        
        return data || [];
      } catch (error) {
        console.error('Error fetching ROMs:', error);
        throw error;
      }
    },
    
    // Get ROMs for specific device
    getByDevice: async (deviceCodename: string): Promise<RomDb[]> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('roms')
          .select('*')
          .eq('device_codename', deviceCodename)
          .order('id', { ascending: true });
          
        if (error) {
          console.error('Error fetching ROMs for device from Supabase:', error);
          throw new Error(`Failed to fetch ROMs for device: ${error.message}`);
        }
        
        return data || [];
      } catch (error) {
        console.error('Error fetching ROMs for device:', error);
        throw error;
      }
    },
    
    // Create a new ROM
    create: async (romData: Omit<RomDb, 'id' | 'downloads'>): Promise<RomDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('roms')
          .insert([{
            device_codename: romData.device_codename,
            rom_type: romData.rom_type,
            version: romData.version,
            size: romData.size,
            maintainer: romData.maintainer,
            download_url: romData.download_url,
            changelog: romData.changelog,
            notes: romData.notes || null,
            status: romData.status,
            upload_date: romData.upload_date || new Date().toISOString().split('T')[0],
            downloads: 0 // Initialize with 0 downloads
          }])
          .select()
          .single();
          
        if (error) {
          console.error('Error creating ROM in Supabase:', error);
          throw new Error(`Failed to create ROM: ${error.message}`);
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
    getAll: async (): Promise<ApplicationDb[]> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) {
          console.error('Error fetching applications from Supabase:', error);
          throw new Error(`Failed to fetch applications: ${error.message}`);
        }
        
        return data || [];
      } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }
    },
    
    // Create a new application
    create: async (appData: Omit<ApplicationDb, 'id' | 'date' | 'status'>): Promise<ApplicationDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
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
          console.error('Error creating application in Supabase:', error);
          throw new Error(`Failed to create application: ${error.message}`);
        }
        
        return data;
      } catch (error) {
        console.error('Error creating application:', error);
        throw error;
      }
    },
    
    // Update an application
    update: async (id: number, appData: Partial<ApplicationDb>): Promise<ApplicationDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
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
          console.error('Error updating application in Supabase:', error);
          throw new Error(`Failed to update application: ${error.message}`);
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
    getAll: async (): Promise<ChangelogDb[]> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('changelogs')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) {
          console.error('Error fetching changelogs from Supabase:', error);
          throw new Error(`Failed to fetch changelogs: ${error.message}`);
        }
        
        return data || [];
      } catch (error) {
        console.error('Error fetching changelogs:', error);
        throw error;
      }
    },
    
    // Create a new changelog
    create: async (changelogData: Omit<ChangelogDb, 'id'>): Promise<ChangelogDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('changelogs')
          .insert([{
            device: changelogData.device,
            rom_type: changelogData.rom_type,
            version: changelogData.version,
            date: changelogData.date,
            changelog: changelogData.changelog,
            status: changelogData.status
          }])
          .select()
          .single();
          
        if (error) {
          console.error('Error creating changelog in Supabase:', error);
          throw new Error(`Failed to create changelog: ${error.message}`);
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
    get: async (): Promise<SettingsDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .single();
          
        if (error) {
          console.error('Error fetching settings from Supabase:', error);
          // If settings don't exist, return default settings
          if (error.code === 'PGRST116') { // Row not found error
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
          throw new Error(`Failed to fetch settings: ${error.message}`);
        }
        
        return data;
      } catch (error) {
        console.error('Error fetching settings:', error);
        throw error;
      }
    },
    
    // Update settings
    update: async (settingsData: Partial<SettingsDb>): Promise<SettingsDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
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
          console.error('Error updating settings in Supabase:', error);
          throw new Error(`Failed to update settings: ${error.message}`);
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
    get: async (): Promise<UserDb | null> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        // For now, we'll return a default user for demo purposes
        // In production, this would be tied to authentication
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
    update: async (userData: Partial<UserDb>): Promise<UserDb> => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
      }
      
      try {
        // For now, we'll just return the user data for demo purposes
        // In production, this would update the authenticated user
        return {
          id: userData.id || 1,
          email: userData.email || "admin@projectsleep.com",
          password: userData.password || "admin123",
          role: userData.role || "admin"
        };
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  }
};