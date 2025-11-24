// api/devices/[id].ts - Handle specific device operations and device roms
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const pathParts = path.split('/').filter(Boolean);

  // Extract the device identifier and potential action
  if (pathParts.length >= 3 && pathParts[0] === 'api' && pathParts[1] === 'devices') {
    const deviceIdentifier = pathParts[2];
    const action = pathParts[3]; // Could be 'roms' or undefined

    // For this implementation, we'll use mock data - in production, this would connect to a real database
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
        { id: 4, device: "Google Pixel 4", romType: "SleepOS", version: "v2.3.1", date: "2025-10-25", changelog: "# v2.3.1\n- Fixed camera issues\n- Improved stability", status: "Published" },
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

    const { method } = request;

    if (action === 'roms') {
      // Handle /api/devices/[codename]/roms
      const device = mockData.devices.find((d: any) => d.codename === deviceIdentifier);

      if (!device) {
        return new Response(JSON.stringify({ error: 'Device not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      switch (method) {
        case 'GET':
          return new Response(JSON.stringify(device.roms || []), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });

        case 'POST':
          const newRomData = await request.json();

          if (!Array.isArray(device.roms)) {
            device.roms = [];
          }

          const allRoms = mockData.devices.flatMap((d: any) => d.roms || []);
          const newId = Math.max(0, ...allRoms.map((r: any) => r.id || 0)) + 1;

          const newRom = {
            ...newRomData,
            id: newId,
            deviceCodename: device.codename,
            downloads: 0,
          };

          device.roms.push(newRom);
          device.lastUpdate = new Date().toISOString().split('T')[0];

          return new Response(JSON.stringify(newRom), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });

        default:
          return new Response(null, { status: 405 });
      }
    } else {
      // Handle /api/devices/[id] where deviceIdentifier is the numeric ID
      const deviceId = parseInt(deviceIdentifier);
      const deviceIndex = mockData.devices.findIndex((d: any) => d.id === deviceId);

      switch (method) {
        case 'GET':
          if (deviceIndex === -1) {
            return new Response(null, { status: 404 });
          }

          return new Response(JSON.stringify(mockData.devices[deviceIndex]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });

        case 'PUT':
          if (deviceIndex === -1) {
            return new Response(null, { status: 404 });
          }

          const updatedDevice = { ...await request.json(), id: deviceId };
          mockData.devices[deviceIndex] = updatedDevice;

          return new Response(JSON.stringify(updatedDevice), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });

        case 'DELETE':
          if (deviceIndex === -1) {
            return new Response(null, { status: 404 });
          }

          mockData.devices.splice(deviceIndex, 1);

          return new Response(null, { status: 204 });

        default:
          return new Response(null, { status: 405 });
      }
    }
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}