// api/index.ts - Main API endpoint for non-device specific data using Supabase
export const config = {
  runtime: 'edge',
};

// Import Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export default async function handler(request: Request) {
  if (!supabase) {
    return new Response(
      JSON.stringify({ error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' }),
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

    switch (endpoint) {
      case 'roms':
        if (routeSegments.length === 1) {
          // Handle /api/roms - return all ROMs
          if (method === 'GET') {
            try {
              const { data, error } = await supabase
                .from('roms')
                .select('*')
                .order('id', { ascending: true });

              if (error) {
                throw new Error(error.message);
              }

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
        break;

      case 'applications':
        // Handle /api/applications
        if (routeSegments.length === 1) {
          if (method === 'GET') {
            try {
              const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('id', { ascending: true });

              if (error) {
                throw new Error(error.message);
              }

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
            try {
              // Add new application
              const newApplicationData = await request.json();

              const { data, error } = await supabase
                .from('applications')
                .insert([{
                  name: newApplicationData.name,
                  email: newApplicationData.email,
                  role: newApplicationData.role,
                  portfolio: newApplicationData.portfolio,
                  message: newApplicationData.message,
                  cv: newApplicationData.cv || null,
                  status: 'Pending',
                  date: new Date().toISOString().split('T')[0]
                }])
                .select()
                .single();

              if (error) {
                throw new Error(error.message);
              }

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
            try {
              // Update application
              const updatedApp = await request.json();

              const { data, error } = await supabase
                .from('applications')
                .update({
                  name: updatedApp.name,
                  email: updatedApp.email,
                  role: updatedApp.role,
                  portfolio: updatedApp.portfolio,
                  message: updatedApp.message,
                  cv: updatedApp.cv || null,
                  status: updatedApp.status
                })
                .eq('id', appId)
                .select()
                .single();

              if (error) {
                throw new Error(error.message);
              }

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
        break;

      case 'changelogs':
        // Handle /api/changelogs
        if (routeSegments.length === 1) {
          if (method === 'GET') {
            try {
              const { data, error } = await supabase
                .from('changelogs')
                .select('*')
                .order('id', { ascending: true });

              if (error) {
                throw new Error(error.message);
              }

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
            try {
              // Add new changelog
              const newChangelogData = await request.json();

              const { data, error } = await supabase
                .from('changelogs')
                .insert([{
                  device: newChangelogData.device,
                  rom_type: newChangelogData.romType,
                  version: newChangelogData.version,
                  date: newChangelogData.date,
                  changelog: newChangelogData.changelog,
                  status: newChangelogData.status
                }])
                .select()
                .single();

              if (error) {
                throw new Error(error.message);
              }

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
            try {
              // Update changelog
              const updatedChangelog = await request.json();

              const { data, error } = await supabase
                .from('changelogs')
                .update({
                  device: updatedChangelog.device,
                  rom_type: updatedChangelog.romType,
                  version: updatedChangelog.version,
                  date: updatedChangelog.date,
                  changelog: updatedChangelog.changelog,
                  status: updatedChangelog.status
                })
                .eq('id', changelogId)
                .select()
                .single();

              if (error) {
                throw new Error(error.message);
              }

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
            try {
              // Delete changelog
              const { error } = await supabase
                .from('changelogs')
                .delete()
                .eq('id', changelogId);

              if (error) {
                throw new Error(error.message);
              }

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
        break;

      case 'settings':
        // Handle /api/settings
        if (routeSegments.length === 1) {
          if (method === 'GET') {
            try {
              const { data, error } = await supabase
                .from('settings')
                .select('*')
                .single();

              if (error && error.code !== 'PGRST116') { // PGRST116 means row not found
                throw new Error(error.message);
              }

              // If settings don't exist, return defaults
              if (!data) {
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

              return new Response(JSON.stringify(data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } catch (error) {
              console.error('Error fetching settings:', error);
              return new Response(JSON.stringify({ error: 'Failed to fetch settings' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          } else if (method === 'PUT' || method === 'POST') {
            try {
              // Update or upsert settings
              const newSettings = await request.json();

              const { data, error } = await supabase
                .from('settings')
                .upsert([{
                  id: 1, // Assuming single settings record with id = 1
                  ...newSettings
                }])
                .select()
                .single();

              if (error) {
                throw new Error(error.message);
              }

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
        break;

      case 'user':
        // Handle /api/user (get current user)
        if (routeSegments.length === 1) {
          if (method === 'GET') {
            // Return a default user representation (in production, this would be tied to session)
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
            // Update user (in production, this would be tied to session)
            try {
              const userData = await request.json();

              // In a real app, this would update the authenticated user's profile
              // For this demo, we'll just return the provided data
              return new Response(JSON.stringify(userData), {
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
        break;
    }
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}  }

  return new Response(JSON.stringify({ error: "Endpoint not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
}
