// api/index.ts - Main API entry point for all operations
export const config = {
  runtime: 'edge',
};

// Import Supabase client directly in the edge function
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export default async function handler(request: Request) {
  // Check if Supabase is configured
  if (!supabase) {
    return new Response(
      JSON.stringify({ 
        error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
        SUPABASE_URL: !!SUPABASE_URL,
        SUPABASE_ANON_KEY: !!SUPABASE_ANON_KEY
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const { method, url } = request;
  const parsedUrl = new URL(url);
  const path = parsedUrl.pathname;

  // Extract the endpoint from the path
  const pathSegments = path.split('/').filter(Boolean);

  if (pathSegments.length >= 1 && pathSegments[0] === 'api') {
    const routeSegments = pathSegments.slice(1);

    if (routeSegments.length === 0) {
      // Return default data
      return new Response(JSON.stringify({ message: "API root endpoint" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const endpoint = routeSegments[0];

    // Handle devices endpoint
    if (endpoint === 'devices' && routeSegments.length === 1) {
      if (method === 'GET') {
        // Get all devices
        try {
          const { data, error } = await supabase
            .from('devices')
            .select('*')
            .order('id', { ascending: true });

          if (error) throw error;

          return new Response(JSON.stringify(data || []), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error fetching devices:', error);
          return new Response(JSON.stringify({ error: 'Failed to fetch devices' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else if (method === 'POST') {
        // Add new device
        try {
          const deviceData = await request.json();
          
          const { data, error } = await supabase
            .from('devices')
            .insert([{
              name: deviceData.name,
              codename: deviceData.codename,
              status: deviceData.status || 'Active',
              last_update: new Date().toISOString().split('T')[0],
              roms: [] // Initialize with empty ROMs array
            }])
            .select()
            .single();

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error adding device:', error);
          return new Response(JSON.stringify({ error: 'Failed to add device' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
    // Handle device-specific operations
    else if (endpoint === 'devices' && routeSegments.length >= 2) {
      const deviceParam = routeSegments[1];
      
      // Check if the third segment is 'roms' for ROM operations
      if (routeSegments.length === 3 && routeSegments[2] === 'roms') {
        // Handle /api/devices/[codename]/roms
        if (method === 'GET') {
          // Get ROMs for specific device
          try {
            const { data, error } = await supabase
              .from('roms')
              .select('*')
              .eq('device_codename', deviceParam)
              .order('id', { ascending: true });

            if (error) throw error;

            return new Response(JSON.stringify(data || []), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error fetching ROMs for device:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch ROMs for device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'POST') {
          // Add ROM to specific device
          try {
            const romData = await request.json();
            
            const { data, error } = await supabase
              .from('roms')
              .insert([{
                device_codename: deviceParam,
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
              }])
              .select()
              .single();

            if (error) throw error;

            // Also update device's last update date
            await supabase
              .from('devices')
              .update({ last_update: new Date().toISOString().split('T')[0] })
              .eq('codename', deviceParam);

            return new Response(JSON.stringify(data), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error adding ROM to device:', error);
            return new Response(JSON.stringify({ error: 'Failed to add ROM to device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } else {
        // Handle /api/devices/[id] - operations on specific device by ID
        const deviceId = parseInt(deviceParam);
        if (isNaN(deviceId)) {
          return new Response(JSON.stringify({ error: 'Invalid device ID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (method === 'GET') {
          // Get specific device by ID
          try {
            const { data, error } = await supabase
              .from('devices')
              .select('*')
              .eq('id', deviceId)
              .single();

            if (error) {
              if (error.code === 'PGRST116') { // Record not found
                return new Response(JSON.stringify({ error: 'Device not found' }), {
                  status: 404,
                  headers: { 'Content-Type': 'application/json' }
                });
              }
              throw error;
            }

            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error fetching device:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'PUT') {
          // Update specific device
          try {
            const updateData = await request.json();
            
            const { data, error } = await supabase
              .from('devices')
              .update({
                name: updateData.name,
                codename: updateData.codename,
                status: updateData.status,
                last_update: new Date().toISOString().split('T')[0]
              })
              .eq('id', deviceId)
              .select()
              .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error updating device:', error);
            return new Response(JSON.stringify({ error: 'Failed to update device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'DELETE') {
          // Delete specific device
          try {
            const { error } = await supabase
              .from('devices')
              .delete()
              .eq('id', deviceId);

            if (error) throw error;

            return new Response(null, { status: 204 });
          } catch (error) {
            console.error('Error deleting device:', error);
            return new Response(JSON.stringify({ error: 'Failed to delete device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      }
    }
    // Handle ROMs endpoint
    else if (endpoint === 'roms' && routeSegments.length === 1) {
      if (method === 'GET') {
        // Get all ROMs
        try {
          const { data, error } = await supabase
            .from('roms')
            .select('*')
            .order('id', { ascending: true });

          if (error) throw error;

          return new Response(JSON.stringify(data || []), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error fetching ROMs:', error);
          return new Response(JSON.stringify({ error: 'Failed to fetch ROMs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
    // Handle applications endpoint
    else if (endpoint === 'applications') {
      if (routeSegments.length === 1) {
        if (method === 'GET') {
          // Get all applications
          try {
            const { data, error } = await supabase
              .from('applications')
              .select('*')
              .order('id', { ascending: true });

            if (error) throw error;

            return new Response(JSON.stringify(data || []), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error fetching applications:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch applications' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'POST') {
          // Add new application
          try {
            const appData = await request.json();
            
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

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error adding application:', error);
            return new Response(JSON.stringify({ error: 'Failed to add application' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } else if (routeSegments.length === 2) {
        // Handle /api/applications/:id
        const appId = parseInt(routeSegments[1]);
        if (isNaN(appId)) {
          return new Response(JSON.stringify({ error: 'Invalid application ID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (method === 'PUT') {
          // Update specific application
          try {
            const appData = await request.json();
            
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
              .eq('id', appId)
              .select()
              .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error updating application:', error);
            return new Response(JSON.stringify({ error: 'Failed to update application' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      }
    }
    // Handle changelogs endpoint
    else if (endpoint === 'changelogs') {
      if (routeSegments.length === 1) {
        if (method === 'GET') {
          // Get all changelogs
          try {
            const { data, error } = await supabase
              .from('changelogs')
              .select('*')
              .order('id', { ascending: true });

            if (error) throw error;

            return new Response(JSON.stringify(data || []), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error fetching changelogs:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch changelogs' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'POST') {
          // Add new changelog
          try {
            const changelogData = await request.json();
            
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

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error adding changelog:', error);
            return new Response(JSON.stringify({ error: 'Failed to add changelog' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } else if (routeSegments.length === 2) {
        // Handle /api/changelogs/:id
        const changelogId = parseInt(routeSegments[1]);
        if (isNaN(changelogId)) {
          return new Response(JSON.stringify({ error: 'Invalid changelog ID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (method === 'PUT') {
          // Update specific changelog
          try {
            const changelogData = await request.json();
            
            const { data, error } = await supabase
              .from('changelogs')
              .update({
                device: changelogData.device,
                rom_type: changelogData.romType,
                version: changelogData.version,
                date: changelogData.date,
                changelog: changelogData.changelog,
                status: changelogData.status
              })
              .eq('id', changelogId)
              .select()
              .single();

            if (error) throw error;

            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error updating changelog:', error);
            return new Response(JSON.stringify({ error: 'Failed to update changelog' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'DELETE') {
          // Delete specific changelog
          try {
            const { error } = await supabase
              .from('changelogs')
              .delete()
              .eq('id', changelogId);

            if (error) throw error;

            return new Response(null, { status: 204 });
          } catch (error) {
            console.error('Error deleting changelog:', error);
            return new Response(JSON.stringify({ error: 'Failed to delete changelog' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      }
    }
    // Handle settings endpoint
    else if (endpoint === 'settings' && routeSegments.length === 1) {
      if (method === 'GET') {
        // Get settings
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('*')
            .single();

          if (error) {
            if (error.code === 'PGRST116') { // Record not found
              // Return defaults if no settings exist yet
              return new Response(JSON.stringify({
                id: 1,
                site_name: "Project Sleep",
                site_description: "Custom ROMs crafted with care for the community.",
                contact_email: "contact@projectsleep.com",
                discord_link: "https://discord.gg/sK433E4jq",
                telegram_link: "https://t.me/SleepOsUser",
                download_server: "https://downloads.projectsleep.com",
                enable_downloads: true,
                enable_team_applications: true,
              }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            }
            throw error;
          }

          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error fetching settings:', error);
          // Return default settings in case of error
          return new Response(JSON.stringify({
            id: 1,
            site_name: "Project Sleep",
            site_description: "Custom ROMs crafted with care for the community.",
            contact_email: "contact@projectsleep.com",
            discord_link: "https://discord.gg/sK433E4jq",
            telegram_link: "https://t.me/SleepOsUser",
            download_server: "https://downloads.projectsleep.com",
            enable_downloads: true,
            enable_team_applications: true,
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else if (method === 'PUT' || method === 'POST') {
        // Update or upsert settings
        try {
          const settingsData = await request.json();
          
          const { data, error } = await supabase
            .from('settings')
            .upsert([{
              id: 1, // Always use id=1 for settings
              ...settingsData
            }])
            .select()
            .single();

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error updating settings:', error);
          return new Response(JSON.stringify({ error: 'Failed to update settings' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
    // Handle user endpoint
    else if (endpoint === 'user' && routeSegments.length === 1) {
      if (method === 'GET') {
        // Get current user (for demo purposes, return a default user)
        return new Response(JSON.stringify({
          id: 1,
          email: "admin@projectsleep.com",
          password: "admin123", // In production, this would be hashed
          role: "admin"
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'PUT') {
        // Update user (for demo purposes)
        try {
          const userData = await request.json();
          
          const { data, error } = await supabase
            .from('users')
            .upsert([{
              id: userData.id || 1,
              email: userData.email,
              password: userData.password, // In production, this would be hashed
              role: userData.role || 'user'
            }])
            .select()
            .single();

          if (error) throw error;

          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error updating user:', error);
          return new Response(JSON.stringify({ error: 'Failed to update user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}