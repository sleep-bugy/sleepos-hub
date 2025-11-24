// api/devices/[id].ts - Handle specific device operations and device roms
export const config = {
  runtime: 'edge',
};

// Store for demo purposes - in production, this would connect to a real database
let mockDevices = [
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
];

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const pathSegments = path.split('/').filter(Boolean);
  
  // Extract the device identifier and potential action
  if (pathSegments.length >= 3 && pathSegments[0] === 'api' && pathSegments[1] === 'devices') {
    const deviceIdentifier = pathSegments[2];
    const action = pathSegments[3]; // Could be 'roms' or undefined
    
    const { method } = request;

    if (action === 'roms') {
      // Handle /api/devices/[codename]/roms
      if (method === 'GET') {
        // Get ROMs for specific device by codename
        const device = mockDevices.find(d => d.codename === deviceIdentifier);
        if (!device) {
          return new Response(JSON.stringify({ error: 'Device not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        return new Response(JSON.stringify(device.roms || []), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'POST') {
        // Add ROM to specific device
        const newRomData = await request.json();
        const deviceIndex = mockDevices.findIndex(d => d.codename === deviceIdentifier);
        
        if (deviceIndex === -1) {
          return new Response(JSON.stringify({ error: 'Device not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Add new ROM to the device
        const allRoms = mockDevices.flatMap(d => d.roms || []);
        const newId = Math.max(...allRoms.map(r => r.id || 0), 0) + 1;
        
        const newRom = {
          ...newRomData,
          id: newId,
          downloads: 0,
        };
        
        if (!mockDevices[deviceIndex].roms) {
          mockDevices[deviceIndex].roms = [];
        }
        
        mockDevices[deviceIndex].roms.push(newRom);
        mockDevices[deviceIndex].lastUpdate = new Date().toISOString().split('T')[0];
        
        return new Response(JSON.stringify(newRom), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      // Handle /api/devices/[id] where deviceIdentifier is the numeric ID
      const deviceId = parseInt(deviceIdentifier);
      if (isNaN(deviceId)) {
        return new Response(JSON.stringify({ error: 'Invalid device ID' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const deviceIndex = mockDevices.findIndex(d => d.id === deviceId);
      
      if (method === 'GET') {
        if (deviceIndex === -1) {
          return new Response(JSON.stringify({ error: 'Device not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        return new Response(JSON.stringify(mockDevices[deviceIndex]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'PUT') {
        if (deviceIndex === -1) {
          return new Response(JSON.stringify({ error: 'Device not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Update an existing device
        const updateData = await request.json();
        mockDevices[deviceIndex] = {
          ...mockDevices[deviceIndex],
          ...updateData,
          id: deviceId
        };
        
        return new Response(JSON.stringify(mockDevices[deviceIndex]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'DELETE') {
        if (deviceIndex === -1) {
          return new Response(JSON.stringify({ error: 'Device not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        mockDevices.splice(deviceIndex, 1);
        return new Response(null, {
          status: 204
        });
      }
    }
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}