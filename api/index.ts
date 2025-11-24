// api/index.ts - Main API endpoint for non-device specific data
export const config = {
  runtime: 'edge',
};

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
            // For now, returning empty array - this would connect to database in production
            return new Response(JSON.stringify([]), {
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
            // For now, returning empty array - this would connect to database in production
            return new Response(JSON.stringify([]), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'POST') {
            // Add new application
            const newApplicationData = await request.json();
            // In production, this would connect to a database
            return new Response(JSON.stringify({ ...newApplicationData, id: Date.now() }), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (pathSegments.length === 2) {
            // Handle /api/applications/:id
            if (method === 'PUT') {
              // Update application
              const updatedApp = await request.json();
              // In production, this would connect to a database
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
            // For now, returning empty array - this would connect to database in production
            return new Response(JSON.stringify([]), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'POST') {
            // Add new changelog
            const newChangelogData = await request.json();
            // In production, this would connect to a database
            return new Response(JSON.stringify({ ...newChangelogData, id: Date.now() }), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (pathSegments.length === 2) {
            // Handle /api/changelogs/:id
            if (method === 'PUT') {
              // Update changelog
              const updatedChangelog = await request.json();
              // In production, this would connect to a database
              return new Response(JSON.stringify(updatedChangelog), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } else if (method === 'DELETE') {
              // Delete changelog
              return new Response(null, { status: 204 });
            }
          }
        }
        break;

      case 'settings':
        if (pathSegments.length === 1) {
          // Handle /api/settings
          if (method === 'GET') {
            // Return default settings
            return new Response(JSON.stringify({
              siteName: "Project Sleep",
              siteDescription: "Custom ROMs crafted with care for the community.",
              contactEmail: "contact@projectsleep.com",
              discordLink: "https://discord.gg/sK433E4jq",
              telegramLink: "https://t.me/SleepOsUser",
              downloadServer: "https://downloads.projectsleep.com",
              enableDownloads: true,
              enableTeamApplications: true,
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'PUT') {
            // Update settings
            const newSettings = await request.json();
            // In production, this would connect to a database
            return new Response(JSON.stringify(newSettings), {
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
            // Return default user
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
            // Update user
            const userData = await request.json();
            // In production, this would connect to a database
            return new Response(JSON.stringify(userData), {
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
}    }
  }

  return new Response(JSON.stringify({ error: "Endpoint not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
}
