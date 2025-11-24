// api/devices/index.ts - Handle all devices data (for GET and POST)
export const config = {
  runtime: 'edge',
};

// Import database operations
import { dbOperations } from '@/lib/database';

export default async function handler(request: Request) {
  const { method } = request;
  
  if (method === 'GET') {
    // Return all devices from database
    const devices = await dbOperations.devices.getAll();
    return new Response(JSON.stringify(devices), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else if (method === 'POST') {
    // Add a new device to database
    const newDeviceData = await request.json();
    const newDevice = await dbOperations.devices.create(newDeviceData);
    
    return new Response(JSON.stringify(newDevice), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(null, { status: 405 });
}