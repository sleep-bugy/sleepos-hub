// api/devices/[id].ts - Handle device operations and device roms using dynamic routing
// This file handles both /api/devices/[id] and /api/devices/[codename]/roms
export const config = {
  runtime: 'edge',
};

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export default async function handler(request: Request) {
  if (!supabase) {
    return new Response(
      JSON.stringify({ 
        error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const { method } = request;
  const url = new URL(request.url);
  const path = url.pathname;
  const pathSegments = path.split('/').filter(Boolean);
  
  // This handles paths like:
  // /api/devices/[id] - for device CRUD operations (GET, PUT, DELETE)
  // /api/devices/[codename]/roms - for ROM operations on a specific device (GET, POST)
  if (pathSegments.length >= 3 && pathSegments[0] === 'api' && pathSegments[1] === 'devices') {
    const deviceParam = pathSegments[2];
    const action = pathSegments[3]; // Could be 'roms' or undefined

    // Check if this is a ROM operation (e.g., /api/devices/cepheus/roms)
    if (action === 'roms') {
      // Handle /api/devices/[codename]/roms
      if (method === 'GET') {
        // Get ROMs for specific device by codename
        try {
          const { data, error } = await supabase
            .from('roms')
            .select('*')
            .eq('device_codename', deviceParam)
            .order('id', { ascending: true });

          if (error) {
            console.error('Error fetching ROMs for device from Supabase:', error);
            throw new Error(error.message);
          }

          return new Response(JSON.stringify(data || []), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error fetching ROMs for device:', error);
          return new Response(JSON.stringify({ error: 'Failed to fetch ROMs for device' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else if (method === 'POST') {
        // Add ROM to specific device
        try {
          const newRomData = await request.json();

          const { data, error } = await supabase
            .from('roms')
            .insert([{
              device_codename: deviceParam,
              rom_type: newRomData.romType,
              version: newRomData.version,
              size: newRomData.size,
              maintainer: newRomData.maintainer,
              download_url: newRomData.downloadUrl,
              changelog: newRomData.changelog,
              notes: newRomData.notes || null,
              status: newRomData.status,
              upload_date: newRomData.uploadDate || new Date().toISOString().split('T')[0],
              downloads: 0 // Initialize with 0 downloads
            }])
            .select()
            .single();

          if (error) {
            console.error('Error adding ROM to device from Supabase:', error);
            throw new Error(error.message);
          }

          // Update device's last update date
          await supabase
            .from('devices')
            .update({ last_update: new Date().toISOString().split('T')[0] })
            .eq('codename', deviceParam);

          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error adding ROM to device:', error);
          return new Response(JSON.stringify({ error: 'Failed to add ROM to device' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    } else {
      // Handle device operations based on ID
      // Check if the parameter is numeric (ID) or string (codename)
      const isNumericId = !isNaN(Number(deviceParam));
      const deviceId = parseInt(deviceParam);
      
      if (isNumericId) {
        // Process operations by numeric ID
        if (method === 'GET') {
          // Get specific device by ID
          try {
            const { data, error } = await supabase
              .from('devices')
              .select('*')
              .eq('id', deviceId)
              .single();

            if (error) {
              if (error.code === 'PGRST116') { // Record not found
                return new Response(JSON.stringify({ error: 'Device not found' }), {
                  status: 404,
                  headers: { 'Content-Type': 'application/json' }
                });
              }
              console.error('Error fetching device from Supabase:', error);
              throw error;
            }

            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error fetching device:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'PUT') {
          // Update device by ID
          try {
            const updateData = await request.json();

            const { data, error } = await supabase
              .from('devices')
              .update({
                name: updateData.name,
                codename: updateData.codename,
                status: updateData.status,
                last_update: new Date().toISOString().split('T')[0]
              })
              .eq('id', deviceId)
              .select()
              .single();

            if (error) {
              console.error('Error updating device from Supabase:', error);
              throw error;
            }

            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error updating device:', error);
            return new Response(JSON.stringify({ error: 'Failed to update device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'DELETE') {
          // Delete device by ID
          try {
            const { error } = await supabase
              .from('devices')
              .delete()
              .eq('id', deviceId);

            if (error) {
              console.error('Error deleting device from Supabase:', error);
              throw error;
            }

            return new Response(null, { status: 204 });
          } catch (error) {
            console.error('Error deleting device:', error);
            return new Response(JSON.stringify({ error: 'Failed to delete device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } else {
        // If the parameter is not numeric, it's likely a codename being used incorrectly
        // In our case, codename should only be used with 'roms' action 
        // So if we reach this, it's an invalid operation
        return new Response(JSON.stringify({ error: 'Invalid operation. Use numeric ID for device operations or add /roms to the path for ROM operations' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}