// api/devices/[id].ts - Handle specific device operations and device roms
export const config = {
  runtime: 'edge',
};

// For a serverless function, we cannot maintain state between requests
// This would require a real database in production
// For this demo, we'll return the same mock data for read operations
// and only handle the actual create/update/delete operations in a real implementation

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const pathParts = path.split('/').filter(Boolean);

  // Extract the device identifier and potential action
  if (pathParts.length >= 3 && pathParts[0] === 'api' && pathParts[1] === 'devices') {
    const deviceIdentifier = pathParts[2];
    const action = pathParts[3]; // Could be 'roms' or undefined

    const { method } = request;

    if (action === 'roms') {
      // Handle /api/devices/[codename]/roms
      // For demo purposes, we'll return a fixed response for roms
      // In a real implementation, this would connect to a database
      if (method === 'GET') {
        // Return empty array or fixed mock data for GET
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'POST') {
        // Simulate adding a ROM
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
      // For demo purposes, we'll return fixed mock data for GET
      // and handle creation/updates differently
      if (method === 'GET') {
        // Return a specific device or 404 if not found
        // In a real implementation, query the database
        return new Response(JSON.stringify({ error: "Device not found in demo mode" }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'PUT') {
        // Update an existing device
        const updatedData = await request.json();
        return new Response(JSON.stringify(updatedData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'DELETE') {
        // Delete a device
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