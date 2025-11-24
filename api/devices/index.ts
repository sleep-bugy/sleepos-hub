// api/devices/index.ts - Handle all devices data (for GET and POST)
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const { method } = request;

  if (method === 'GET') {
    // Return all devices
    // For now returning mock data - in production this would connect to database
    return new Response(JSON.stringify([
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
    ]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else if (method === 'POST') {
    // Add a new device
    const newDeviceData = await request.json();
    const newDevice = {
      ...newDeviceData,
      id: Date.now(), // Using timestamp as ID in this demo
      roms: [],
      lastUpdate: new Date().toISOString().split('T')[0],
    };

    return new Response(JSON.stringify(newDevice), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(null, { status: 405 });
}
