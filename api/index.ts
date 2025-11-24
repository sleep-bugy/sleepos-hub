// api/index.ts - Main API endpoint for non-device specific data
export const config = {
  runtime: 'edge',
};

// Import database operations
import { dbOperations } from '@/lib/database';

export default async function handler(request: Request) {
  const { method, url } = request;
  const parsedUrl = new URL(url);
  const path = parsedUrl.pathname;

  // Extract the endpoint from the path
  const pathSegments = path.split('/').filter(Boolean);

  if (pathSegments.length >= 1 && pathSegments[0] === 'api') {
    // Remove 'api' from path segments
    pathSegments.shift();

    if (pathSegments.length === 0) {
      // Return default data
      return new Response(JSON.stringify({ message: "API root endpoint" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const endpoint = pathSegments[0];
    
    switch (endpoint) {
      case 'roms':
        if (pathSegments.length === 1) {
          // Handle /api/roms - return all ROMs
          if (method === 'GET') {
            const roms = await dbOperations.roms.getAll();
            return new Response(JSON.stringify(roms), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
        
      case 'applications':
        if (pathSegments.length === 1) {
          // Handle /api/applications
          if (method === 'GET') {
            const applications = await dbOperations.applications.getAll();
            return new Response(JSON.stringify(applications), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'POST') {
            // Add new application
            const newApplicationData = await request.json();
            const newApplication = await dbOperations.applications.create(newApplicationData);
            return new Response(JSON.stringify(newApplication), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (pathSegments.length === 2) {
            // Handle /api/applications/:id
            const appId = parseInt(pathSegments[1]);
            if (method === 'PUT') {
              // Update application
              const updatedApp = await dbOperations.applications.update(appId, await request.json());
              return new Response(JSON.stringify(updatedApp), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }
        }
        break;
        
      case 'changelogs':
        if (pathSegments.length === 1) {
          // Handle /api/changelogs
          if (method === 'GET') {
            const changelogs = await dbOperations.changelogs.getAll();
            return new Response(JSON.stringify(changelogs), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'POST') {
            // Add new changelog
            const newChangelogData = await request.json();
            const newChangelog = await dbOperations.changelogs.create(newChangelogData);
            return new Response(JSON.stringify(newChangelog), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (pathSegments.length === 2) {
            // Handle /api/changelogs/:id
            const changelogId = parseInt(pathSegments[1]);
            if (method === 'PUT') {
              // Update changelog - Note: This would need a specific implementation in dbOperations
              return new Response(JSON.stringify({error: 'Not implemented'}), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
              });
            } else if (method === 'DELETE') {
              // Delete changelog - Note: This would need a specific implementation in dbOperations
              return new Response(null, { status: 204 });
            }
          }
        }
        break;
        
      case 'settings':
        if (pathSegments.length === 1) {
          // Handle /api/settings
          if (method === 'GET') {
            const settings = await dbOperations.settings.get();
            return new Response(JSON.stringify(settings), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'PUT') {
            // Update settings
            const newSettings = await request.json();
            const updatedSettings = await dbOperations.settings.update(newSettings);
            return new Response(JSON.stringify(updatedSettings), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
        
      case 'user':
        if (pathSegments.length === 1) {
          // Handle /api/user (get current user)
          if (method === 'GET') {
            const user = await dbOperations.users.get();
            return new Response(JSON.stringify(user), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'PUT') {
            // Update user
            const userData = await request.json();
            const updatedUser = await dbOperations.users.update(userData);
            return new Response(JSON.stringify(updatedUser), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
    }
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}