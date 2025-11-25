// api/devices/[[...segments]].ts - Handle all device-specific operations
export const config = {
  runtime: 'edge',
};

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export default async function handler(request: Request) {
  // Check if Supabase is configured
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
  const pathSegments = url.pathname.split('/').filter(Boolean);

  // Expected path format options:
  // - /api/devices/[id] - for device operations by numeric ID (GET, PUT, DELETE)
  // - /api/devices/[codename]/roms - for ROM operations on device by codename (GET, POST)

  // Find where 'devices' appears in the path
  const devicesIndex = pathSegments.indexOf('devices');
  if (devicesIndex === -1) {
    return new Response(JSON.stringify({ error: 'Invalid path' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Extract segments after 'devices'
  const deviceSegments = pathSegments.slice(devicesIndex + 1);

  if (deviceSegments.length === 1) {
    // Handle /api/devices/[id] - operations on device by numeric ID
    const param = deviceSegments[0];
    const deviceId = parseInt(param);

    if (isNaN(deviceId)) {
      return new Response(JSON.stringify({ error: 'Device ID must be numeric' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
      // Update specific device
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

        if (error) throw error;

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
      // Delete specific device
      try {
        const { error } = await supabase
          .from('devices')
          .delete()
          .eq('id', deviceId);

        if (error) throw error;

        return new Response(null, { status: 204 });
      } catch (error) {
        console.error('Error deleting device:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete device' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  } else if (deviceSegments.length === 2 && deviceSegments[1] === 'roms') {
    // Handle /api/devices/[codename]/roms - operations on ROMs for a specific device
    const deviceCodename = deviceSegments[0];

    if (method === 'GET') {
      // Get ROMs for specific device by codename
      try {
        const { data, error } = await supabase
          .from('roms')
          .select('*')
          .eq('device_codename', deviceCodename)
          .order('id', { ascending: true });

        if (error) throw error;

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
            device_codename: deviceCodename,
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

        if (error) throw error;

        // Update device's last update date
        await supabase
          .from('devices')
          .update({ last_update: new Date().toISOString().split('T')[0] })
          .eq('codename', deviceCodename);

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
    return new Response(JSON.stringify({ error: 'Invalid path or method' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}