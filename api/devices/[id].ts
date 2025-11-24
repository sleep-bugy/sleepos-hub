// api/devices/[id].ts - Handle specific device operations and device roms
export const config = {
  runtime: 'edge',
};

// Import database operations
import { dbOperations } from '@/lib/database';

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
        const roms = await dbOperations.roms.getByDevice(deviceIdentifier);
        return new Response(JSON.stringify(roms), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'POST') {
        // Add ROM to specific device
        const newRomData = await request.json();
        const newRom = await dbOperations.roms.create({
          ...newRomData,
          deviceCodename: deviceIdentifier
        });
        
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
        // For getting a specific device by ID, we'll need to enhance our dbOperations
        // to query devices by ID, but for now we'll get all and filter
        const allDevices = await dbOperations.devices.getAll();
        const device = allDevices.find(d => d.id === deviceId);
        
        if (!device) {
          return new Response(JSON.stringify({ error: 'Device not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        return new Response(JSON.stringify(device), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'PUT') {
        // Update an existing device
        const updateData = await request.json();
        const updatedDevice = await dbOperations.devices.update(deviceId, updateData);
        
        return new Response(JSON.stringify(updatedDevice), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else if (method === 'DELETE') {
        // Delete a device
        const success = await dbOperations.devices.delete(deviceId);
        
        if (success) {
          return new Response(null, {
            status: 204
          });
        } else {
          return new Response(JSON.stringify({ error: 'Failed to delete device' }), {
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