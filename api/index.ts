// api/index.ts - Main API endpoint for all data
export const config = {
  runtime: 'edge',
};

// Mock data storage (in production, this would connect to a real database)
const mockData = {
  devices: [
    {
      id: 1,
      name: "Xiaomi Mi 9",
      codename: "cepheus",
      status: "Active",
      lastUpdate: "2025-11-15",
      roms: [
        { id: 1, device: "Xiaomi Mi 9", deviceCodename: "cepheus", maintainer: "John Doe", romType: "SleepOS", version: "v2.3.1", size: "1.2 GB", downloads: 1234, status: "Active", uploadDate: "2025-11-15", downloadUrl: "https://example.com/cepheus-sleepos-v2.3.1.zip", changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches" },
        { id: 2, device: "Xiaomi Mi 9", deviceCodename: "cepheus", maintainer: "Jane Smith", romType: "AOSP", version: "v1.5.0", size: "980 MB", downloads: 892, status: "Active", uploadDate: "2025-11-10", downloadUrl: "https://example.com/cepheus-aosp-v1.5.0.zip", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates" }
      ]
    },
    {
      id: 2,
      name: "POCO X3 NFC",
      codename: "surya",
      status: "Active",
      lastUpdate: "2025-11-16",
      roms: [
        { id: 3, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Jane Smith", romType: "SleepOS", version: "v1.2.0", size: "1.8 GB", downloads: 567, status: "Active", uploadDate: "2025-11-20", downloadUrl: "https://example.com/surya-sleepos-v1.2.0.zip", changelog: "# v1.2.0\n- Improved camera performance\n- Enhanced battery life" },
        { id: 4, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Alex Johnson", romType: "AOSP", version: "12.2", size: "1.5 GB", downloads: 321, status: "Active", uploadDate: "2025-11-18", downloadUrl: "https://example.com/surya-aosp-12.2.zip", changelog: "# 12.2\n- Updated to Android 12.2\n- Security patches up to Nov 2025" },
        { id: 5, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Sarah Lee", romType: "Port", version: "v3.0.1", size: "2.1 GB", downloads: 123, status: "Active", uploadDate: "2025-11-15", downloadUrl: "https://example.com/surya-port-v3.0.1.zip", changelog: "# v3.0.1\n- Ported OnePlus camera features\n- Added OnePlus gallery app" }
      ]
    }
  ],
  applications: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer", portfolio: "github.com/john", message: "Experienced Android developer with 5 years of experience", status: "Pending", date: "2025-11-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer", portfolio: "dribbble.com/jane", message: "UI/UX designer with focus on Android interfaces", status: "Reviewed", date: "2025-11-14" },
    { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "Maintainer", portfolio: "github.com/alex", message: "Want to maintain OnePlus devices for Project Sleep", status: "Pending", date: "2025-11-12" },
    { id: 4, name: "Maria Garcia", email: "maria@example.com", role: "Tester", portfolio: "github.com/maria", message: "QA engineer interested in testing ROMs", status: "Accepted", date: "2025-11-10" },
    { id: 5, name: "David Wilson", email: "david@example.com", role: "Developer", portfolio: "github.com/david", message: "Kernel developer with C++ expertise", status: "Rejected", date: "2025-11-08" },
  ],
  changelogs: [
    { id: 1, device: "Xiaomi Mi 9", romType: "SleepOS", version: "v2.3.1", date: "2025-11-15", changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches", status: "Published" },
    { id: 2, device: "OnePlus 7 Pro", romType: "AOSP", version: "v1.5.0", date: "2025-11-10", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates", status: "Published" },
    { id: 3, device: "Samsung Galaxy S10", romType: "Port", version: "v3.0.2", date: "2025-11-12", changelog: "# v3.0.2\n- Ported OneUI features\n- Camera improvements", status: "Draft" },
    { id: 4, device: "Google Pixel 4", romType: "SleepOS", version: "v2.2.8", date: "2025-10-25", changelog: "# v2.2.8\n- Fixed camera issues\n- Improved stability", status: "Published" },
  ],
  settings: {
    siteName: "Project Sleep",
    siteDescription: "Custom ROMs crafted with care for the community.",
    contactEmail: "contact@projectsleep.com",
    discordLink: "https://discord.gg/sK433E4jq",
    telegramLink: "https://t.me/SleepOsUser",
    downloadServer: "https://downloads.projectsleep.com",
    enableDownloads: true,
    enableTeamApplications: true,
  },
  currentUser: {
    id: 1,
    email: "admin@projectsleep.com",
    password: "admin123", // In production, this would be hashed
    role: "admin"
  }
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
      // Return all data
      return new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const endpoint = pathSegments[0];
    
    switch (endpoint) {
      case 'devices':
        if (pathSegments.length === 1) {
          // Handle /api/devices
          if (method === 'GET') {
            return new Response(JSON.stringify(mockData.devices), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'POST') {
            // Add new device
            const newDevice = await request.json();
            const deviceToAdd = {
              ...newDevice,
              id: Math.max(0, ...mockData.devices.map((d: any) => d.id)) + 1,
              roms: [],
              lastUpdate: new Date().toISOString().split('T')[0],
            };
            mockData.devices.push(deviceToAdd);
            return new Response(JSON.stringify(deviceToAdd), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (pathSegments.length === 2) {
          // Handle /api/devices/:id
          const deviceId = parseInt(pathSegments[1]);
          const deviceIndex = mockData.devices.findIndex((d: any) => d.id === deviceId);
          
          if (method === 'GET' && deviceIndex !== -1) {
            return new Response(JSON.stringify(mockData.devices[deviceIndex]), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'PUT' && deviceIndex !== -1) {
            // Update device
            const updatedDevice = { ...await request.json(), id: deviceId };
            mockData.devices[deviceIndex] = updatedDevice;
            return new Response(JSON.stringify(updatedDevice), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'DELETE' && deviceIndex !== -1) {
            // Delete device
            mockData.devices.splice(deviceIndex, 1);
            return new Response(null, { status: 204 });
          }
        }
        break;
        
      case 'roms':
        if (pathSegments.length === 1) {
          // Handle /api/roms - return all ROMs
          if (method === 'GET') {
            const allRoms = mockData.devices.flatMap((device: any) => 
              Array.isArray(device.roms) ? device.roms.map((rom: any) => ({...rom, deviceId: device.id})) : []
            );
            return new Response(JSON.stringify(allRoms), {
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
            return new Response(JSON.stringify(mockData.applications), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'POST') {
            // Add new application
            const newApplicationData = await request.json();
            const newApplication = {
              ...newApplicationData,
              id: Math.max(0, ...mockData.applications.map((a: any) => a.id)) + 1,
              date: new Date().toISOString().split('T')[0],
              status: "Pending",
            };
            mockData.applications.push(newApplication);
            return new Response(JSON.stringify(newApplication), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (pathSegments.length === 2) {
          // Handle /api/applications/:id
          const appId = parseInt(pathSegments[1]);
          const appIndex = mockData.applications.findIndex((a: any) => a.id === appId);
          
          if (method === 'PUT' && appIndex !== -1) {
            // Update application
            const updatedApp = { ...await request.json(), id: appId };
            mockData.applications[appIndex] = updatedApp;
            return new Response(JSON.stringify(updatedApp), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
        
      case 'changelogs':
        if (pathSegments.length === 1) {
          // Handle /api/changelogs
          if (method === 'GET') {
            return new Response(JSON.stringify(mockData.changelogs), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'POST') {
            // Add new changelog
            const newChangelogData = await request.json();
            const newChangelog = {
              ...newChangelogData,
              id: Math.max(0, ...mockData.changelogs.map((c: any) => c.id)) + 1,
            };
            mockData.changelogs.push(newChangelog);
            return new Response(JSON.stringify(newChangelog), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (pathSegments.length === 2) {
          // Handle /api/changelogs/:id
          const changelogId = parseInt(pathSegments[1]);
          const changelogIndex = mockData.changelogs.findIndex((c: any) => c.id === changelogId);
          
          if (method === 'PUT' && changelogIndex !== -1) {
            // Update changelog
            const updatedChangelog = { ...await request.json(), id: changelogId };
            mockData.changelogs[changelogIndex] = updatedChangelog;
            return new Response(JSON.stringify(updatedChangelog), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'DELETE' && changelogIndex !== -1) {
            // Delete changelog
            mockData.changelogs.splice(changelogIndex, 1);
            return new Response(null, { status: 204 });
          }
        }
        break;
        
      case 'settings':
        if (pathSegments.length === 1) {
          // Handle /api/settings
          if (method === 'GET') {
            return new Response(JSON.stringify(mockData.settings), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'PUT') {
            // Update settings
            const newSettings = await request.json();
            mockData.settings = newSettings;
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
            return new Response(JSON.stringify(mockData.currentUser), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } else if (method === 'PUT') {
            // Update user
            const updatedUser = { ...await request.json() };
            mockData.currentUser = updatedUser;
            return new Response(JSON.stringify(updatedUser), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
    }
  }

  // Handle device ROM endpoints
  if (path.includes('/api/devices/') && path.includes('/roms')) {
    // Extract device codename from path: /api/devices/:codename/roms
    const regex = /\/api\/devices\/([^\/]+)\/roms/;
    const match = path.match(regex);
    
    if (match) {
      const deviceCodename = match[1];
      const device = mockData.devices.find((d: any) => d.codename === deviceCodename);
      
      if (device) {
        if (method === 'GET') {
          // Return ROMs for specific device
          return new Response(JSON.stringify(device.roms || []), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } else if (method === 'POST') {
          // Add ROM to specific device
          const newRomData = await request.json();
          
          if (!Array.isArray(device.roms)) {
            device.roms = [];
          }
          
          const allRoms = mockData.devices.flatMap((d: any) => d.roms || []);
          const newId = Math.max(0, ...allRoms.map((r: any) => r.id || 0)) + 1;
          
          const newRom = {
            ...newRomData,
            id: newId,
            deviceCodename,
            downloads: 0,
          };
          
          device.roms.push(newRom);
          device.lastUpdate = new Date().toISOString().split('T')[0];
          
          return new Response(JSON.stringify(newRom), {
            status: 201,
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