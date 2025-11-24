// api/devices/[id].ts - Handle specific device operations and device roms
export const config = {
  runtime: 'edge',
};

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
        // For now, returning empty array - in production this would connect to database
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'POST') {
        // Add ROM to specific device
        const newRomData = await request.json();
        const newRom = {
          ...newRomData,
          id: Date.now(), // Using timestamp as ID in this demo
          downloads: 0,
        };
        
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
      
      if (method === 'GET') {
        // For getting a specific device by ID, we'll return a mock device
        // In production, this would connect to database
        const mockDevice = {
          id: deviceId,
          name: "Mock Device " + deviceId,
          codename: "mock" + deviceId,
          status: "Active",
          lastUpdate: new Date().toISOString().split('T')[0],
          roms: []
        };
        
        return new Response(JSON.stringify(mockDevice), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'PUT') {
        // Update an existing device
        const updateData = await request.json();
        const updatedDevice = {
          ...updateData,
          id: deviceId
        };
        
        return new Response(JSON.stringify(updatedDevice), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'DELETE') {
        // Delete a device - just return success for this demo
        // In production, this would connect to a database
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