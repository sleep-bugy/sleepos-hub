// Database configuration for Supabase integration with fallback
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize client only if credentials are available
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Fallback mock data
const MOCK_DATA = {
  devices: [
    {
      id: 1,
      name: "Xiaomi Mi 9",
      codename: "cepheus",
      status: "Active",
      last_update: "2025-11-15",
      roms: [
        { id: 1, device: "Xiaomi Mi 9", device_codename: "cepheus", maintainer: "John Doe", rom_type: "SleepOS", version: "v2.3.1", size: "1.2 GB", downloads: 1234, status: "Active", upload_date: "2025-11-15", download_url: "https://example.com/cepheus-sleepos-v2.3.1.zip", changelog: "# v2.3.1\\n- Fixed battery drain\\n- Improved performance\\n- Updated security patches" },
        { id: 2, device: "Xiaomi Mi 9", device_codename: "cepheus", maintainer: "Jane Smith", rom_type: "AOSP", version: "v1.5.0", size: "980 MB", downloads: 892, status: "Active", upload_date: "2025-11-10", download_url: "https://example.com/cepheus-aosp-v1.5.0.zip", changelog: "# v1.5.0\\n- Pure AOSP experience\\n- Latest Android updates" }
      ]
    },
    {
      id: 2,
      name: "POCO X3 NFC",
      codename: "surya",
      status: "Active",
      last_update: "2025-11-16",
      roms: [
        { id: 3, device: "POCO X3 NFC", device_codename: "surya", maintainer: "Jane Smith", rom_type: "SleepOS", version: "v1.2.0", size: "1.8 GB", downloads: 567, status: "Active", upload_date: "2025-11-20", download_url: "https://example.com/surya-sleepos-v1.2.0.zip", changelog: "# v1.2.0\\n- Improved camera performance\\n- Enhanced battery life" },
        { id: 4, device: "POCO X3 NFC", device_codename: "surya", maintainer: "Alex Johnson", rom_type: "AOSP", version: "12.2", size: "1.5 GB", downloads: 321, status: "Active", upload_date: "2025-11-18", download_url: "https://example.com/surya-aosp-12.2.zip", changelog: "# 12.2\\n- Updated to Android 12.2\\n- Security patches up to Nov 2025" },
        { id: 5, device: "POCO X3 NFC", device_codename: "surya", maintainer: "Sarah Lee", rom_type: "Port", version: "v3.0.1", size: "2.1 GB", downloads: 123, status: "Active", upload_date: "2025-11-15", download_url: "https://example.com/surya-port-v3.0.1.zip", changelog: "# v3.0.1\\n- Ported OnePlus camera features\\n- Added OnePlus gallery app" }
      ]
    }
  ],
  applications: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer", portfolio: "github.com/john", message: "Experienced Android developer with 5 years of experience", status: "Pending", date: "2025-11-15", cv: null },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer", portfolio: "dribbble.com/jane", message: "UI/UX designer with focus on Android interfaces", status: "Reviewed", date: "2025-11-14", cv: null },
    { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "Maintainer", portfolio: "github.com/alex", message: "Want to maintain OnePlus devices for Project Sleep", status: "Pending", date: "2025-11-12", cv: null },
    { id: 4, name: "Maria Garcia", email: "maria@example.com", role: "Tester", portfolio: "github.com/maria", message: "QA engineer interested in testing ROMs", status: "Accepted", date: "2025-11-10", cv: null },
    { id: 5, name: "David Wilson", email: "david@example.com", role: "Developer", portfolio: "github.com/david", message: "Kernel developer with C++ expertise", status: "Rejected", date: "2025-11-08", cv: null },
  ],
  changelogs: [
    { id: 1, device: "Xiaomi Mi 9", rom_type: "SleepOS", version: "v2.3.1", date: "2025-11-15", changelog: "# v2.3.1\\n- Fixed battery drain\\n- Improved performance\\n- Updated security patches", status: "Published" },
    { id: 2, device: "OnePlus 7 Pro", rom_type: "AOSP", version: "v1.5.0", date: "2025-11-10", changelog: "# v1.5.0\\n- Pure AOSP experience\\n- Latest Android updates", status: "Published" },
    { id: 3, device: "Samsung Galaxy S10", rom_type: "Port", version: "v3.0.2", date: "2025-11-12", changelog: "# v3.0.2\\n- Ported OneUI features\\n- Camera improvements", status: "Draft" },
    { id: 4, device: "Google Pixel 4", rom_type: "SleepOS", version: "v2.2.8", date: "2025-10-25", changelog: "# v2.2.8\\n- Fixed camera issues\\n- Improved stability", status: "Published" },
  ],
  settings: {
    id: 1,
    site_name: "Project Sleep",
    site_description: "Custom ROMs crafted with care for the community.",
    contact_email: "contact@projectsleep.com",
    discord_link: "https://discord.gg/sK433E4jq",
    telegram_link: "https://t.me/SleepOsUser",
    download_server: "https://downloads.projectsleep.com",
    enable_downloads: true,
    enable_team_applications: true,
  },
  users: {
    id: 1,
    email: "admin@projectsleep.com",
    password: "admin123", // In production, this would be hashed
    role: "admin"
  }
};

// Track mock data changes during the session
let mockDevices = [...MOCK_DATA.devices];
let mockApplications = [...MOCK_DATA.applications];
let mockChangelogs = [...MOCK_DATA.changelogs];
let mockSettings = { ...MOCK_DATA.settings };
let mockUsers = { ...MOCK_DATA.users };

// Check if Supabase is available
const isSupabaseAvailable = () => {
  return supabase !== null && SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';
};

// Database operations with fallback to mock data
export const dbOperations = {
  devices: {
    // Get all devices
    getAll: async () => {
      if (isSupabaseAvailable()) {
        try {
          const { data, error } = await supabase
            .from('devices')
            .select('*')
            .order('id', { ascending: true });
            
          if (error) {
            console.error('Error fetching devices from Supabase:', error);
            return mockDevices;
          }
          
          return data || mockDevices;
        } catch (error) {
          console.error('Error fetching devices:', error);
          return mockDevices;
        }
      } else {
        return mockDevices;
      }
    },
    
    // Create a new device
    create: async (deviceData: any) => {
      if (isSupabaseAvailable()) {
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
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('Error creating device:', error);
          throw error;
        }
      } else {
        // Fallback: add to mock data
        const newId = Math.max(0, ...mockDevices.map(d => d.id)) + 1;
        const newDevice = {
          id: newId,
          ...deviceData,
          last_update: new Date().toISOString().split('T')[0],
          roms: []
        };
        mockDevices.push(newDevice);
        return newDevice;
      }
    },
    
    // Update a device
    update: async (id: number, deviceData: any) => {
      if (isSupabaseAvailable()) {
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
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('Error updating device:', error);
          throw error;
        }
      } else {
        // Fallback: update mock data
        const deviceIndex = mockDevices.findIndex(d => d.id === id);
        if (deviceIndex !== -1) {
          mockDevices[deviceIndex] = { ...mockDevices[deviceIndex], ...deviceData, id };
          return mockDevices[deviceIndex];
        }
        throw new Error('Device not found');
      }
    },
    
    // Delete a device
    delete: async (id: number) => {
      if (isSupabaseAvailable()) {
        try {
          const { error } = await supabase
            .from('devices')
            .delete()
            .eq('id', id);
            
          if (error) {
            console.error('Error deleting device from Supabase:', error);
            throw error;
          }
          
          return true;
        } catch (error) {
          console.error('Error deleting device:', error);
          return false;
        }
      } else {
        // Fallback: remove from mock data
        mockDevices = mockDevices.filter(d => d.id !== id);
        return true;
      }
    }
  },
  
  roms: {
    // Get all ROMs
    getAll: async () => {
      if (isSupabaseAvailable()) {
        try {
          const { data, error } = await supabase
            .from('roms')
            .select('*')
            .order('id', { ascending: true });
            
          if (error) {
            console.error('Error fetching ROMs from Supabase:', error);
            // Return ROMs from mock devices as fallback
            return mockDevices.flatMap(device => device.roms || []);
          }
          
          return data || mockDevices.flatMap(device => device.roms || []);
        } catch (error) {
          console.error('Error fetching ROMs:', error);
          return mockDevices.flatMap(device => device.roms || []);
        }
      } else {
        return mockDevices.flatMap(device => device.roms || []);
      }
    },
    
    // Get ROMs for specific device
    getByDevice: async (deviceCodename: string) => {
      if (isSupabaseAvailable()) {
        try {
          const { data, error } = await supabase
            .from('roms')
            .select('*')
            .eq('device_codename', deviceCodename)
            .order('id', { ascending: true });
            
          if (error) {
            console.error('Error fetching ROMs for device from Supabase:', error);
            // Return ROMs for device from mock data as fallback
            const device = mockDevices.find(d => d.codename === deviceCodename);
            return device ? (device.roms || []) : [];
          }
          
          return data || [];
        } catch (error) {
          console.error('Error fetching ROMs for device:', error);
          const device = mockDevices.find(d => d.codename === deviceCodename);
          return device ? (device.roms || []) : [];
        }
      } else {
        // Fallback: return ROMs for device from mock data
        const device = mockDevices.find(d => d.codename === deviceCodename);
        return device ? (device.roms || []) : [];
      }
    },
    
    // Create a new ROM
    create: async (romData: any) => {
      if (isSupabaseAvailable()) {
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
              notes: romData.notes || null,
              status: romData.status,
              upload_date: romData.uploadDate || new Date().toISOString().split('T')[0],
              downloads: 0 // Initialize with 0 downloads
            }])
            .select()
            .single();
            
          if (error) {
            console.error('Error creating ROM in Supabase:', error);
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('Error creating ROM:', error);
          throw error;
        }
      } else {
        // Fallback: add ROM to mock device
        const newId = Math.max(0, ...mockDevices.flatMap(device => device.roms || []).map(r => r.id)) + 1;
        
        const newRom = {
          id: newId,
          device: mockDevices.find(d => d.codename === romData.deviceCodename)?.name || "",
          device_codename: romData.deviceCodename,
          rom_type: romData.romType,
          version: romData.version,
          size: romData.size,
          maintainer: romData.maintainer,
          download_url: romData.downloadUrl,
          changelog: romData.changelog,
          notes: romData.notes || null,
          status: romData.status,
          upload_date: romData.uploadDate || new Date().toISOString().split('T')[0],
          downloads: 0
        };
        
        // Add ROM to the device in mock data
        const device = mockDevices.find(d => d.codename === romData.deviceCodename);
        if (device) {
          if (!device.roms) device.roms = [];
          device.roms.push(newRom);
        }
        
        return newRom;
      }
    }
  },
  
  applications: {
    // Get all applications
    getAll: async () => {
      if (isSupabaseAvailable()) {
        try {
          const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('id', { ascending: true });
            
          if (error) {
            console.error('Error fetching applications from Supabase:', error);
            return mockApplications;
          }
          
          return data || mockApplications;
        } catch (error) {
          console.error('Error fetching applications:', error);
          return mockApplications;
        }
      } else {
        return mockApplications;
      }
    },
    
    // Create a new application
    create: async (appData: any) => {
      if (isSupabaseAvailable()) {
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
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('Error creating application:', error);
          throw error;
        }
      } else {
        // Fallback: add to mock data
        const newId = Math.max(0, ...mockApplications.map(a => a.id)) + 1;
        const newApp = {
          id: newId,
          ...appData,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
          cv: appData.cv || null
        };
        mockApplications.push(newApp);
        return newApp;
      }
    },
    
    // Update an application
    update: async (id: number, appData: any) => {
      if (isSupabaseAvailable()) {
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
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('Error updating application:', error);
          throw error;
        }
      } else {
        // Fallback: update mock data
        const appIndex = mockApplications.findIndex(a => a.id === id);
        if (appIndex !== -1) {
          mockApplications[appIndex] = { ...mockApplications[appIndex], ...appData, id };
          return mockApplications[appIndex];
        }
        throw new Error('Application not found');
      }
    }
  },
  
  changelogs: {
    // Get all changelogs
    getAll: async () => {
      if (isSupabaseAvailable()) {
        try {
          const { data, error } = await supabase
            .from('changelogs')
            .select('*')
            .order('id', { ascending: true });
            
          if (error) {
            console.error('Error fetching changelogs from Supabase:', error);
            return mockChangelogs;
          }
          
          return data || mockChangelogs;
        } catch (error) {
          console.error('Error fetching changelogs:', error);
          return mockChangelogs;
        }
      } else {
        return mockChangelogs;
      }
    },
    
    // Create a new changelog
    create: async (changelogData: any) => {
      if (isSupabaseAvailable()) {
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
            console.error('Error creating changelog in Supabase:', error);
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('Error creating changelog:', error);
          throw error;
        }
      } else {
        // Fallback: add to mock data
        const newId = Math.max(0, ...mockChangelogs.map(c => c.id)) + 1;
        const newChangelog = {
          id: newId,
          ...changelogData
        };
        mockChangelogs.push(newChangelog);
        return newChangelog;
      }
    }
  },
  
  settings: {
    // Get settings
    get: async () => {
      if (isSupabaseAvailable()) {
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('*')
            .single();
            
          if (error) {
            console.error('Error fetching settings from Supabase:', error);
            // If settings don't exist in DB, return defaults
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
      } else {
        return mockSettings;
      }
    },
    
    // Update settings
    update: async (settingsData: any) => {
      if (isSupabaseAvailable()) {
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
            throw error;
          }
          
          return data;
        } catch (error) {
          console.error('Error updating settings:', error);
          throw error;
        }
      } else {
        // Fallback: update mock settings
        mockSettings = { ...mockSettings, ...settingsData };
        return mockSettings;
      }
    }
  },
  
  users: {
    // Get current user
    get: async () => {
      if (isSupabaseAvailable()) {
        // In a real app, this would be tied to authentication
        // For demo purposes, return the mock user
        return mockUsers;
      } else {
        return mockUsers;
      }
    },
    
    // Update user
    update: async (userData: any) => {
      if (isSupabaseAvailable()) {
        // In a real app, this would update the authenticated user
        // For demo purposes, return updated mock user
        return { ...mockUsers, ...userData };
      } else {
        // Fallback: update mock user
        mockUsers = { ...mockUsers, ...userData };
        return mockUsers;
      }
    }
  }
};