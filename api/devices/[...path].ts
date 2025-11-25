// api/devices/[...path].ts - Handle device operations with Supabase REST API
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

  const url = new URL(request.url);
  const path = url.pathname;
  const pathParts = path.split('/').filter(Boolean);

  // Extract the segments after 'api/devices'
  const devicesIndex = pathParts.indexOf('devices');
  if (devicesIndex === -1 || devicesIndex !== 1) { // Expecting: ['api', 'devices', ...]
    return new Response(JSON.stringify({ error: 'Invalid path structure' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const deviceSegments = pathParts.slice(devicesIndex + 1);
  const { method } = request;

  // Handle /api/devices (no additional segments) - all devices operations
  if (deviceSegments.length === 0) {
    if (method === 'GET') {
      try {
        const { data, error } = await supabase
          .from('devices')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching devices from Supabase:', error);
          throw error;
        }

        return new Response(JSON.stringify(data || []), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error fetching devices:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch devices' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else if (method === 'POST') {
      try {
        const newDeviceData = await request.json();

        const { data, error } = await supabase
          .from('devices')
          .insert([{
            name: newDeviceData.name,
            codename: newDeviceData.codename,
            status: newDeviceData.status,
            last_update: new Date().toISOString().split('T')[0],
            roms: [] // Initialize with empty ROMs array
          }])
          .select()
          .single();

        if (error) {
          console.error('Error adding device to Supabase:', error);
          throw error;
        }

        return new Response(JSON.stringify(data), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error adding device:', error);
        return new Response(JSON.stringify({ error: 'Failed to add device' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  } 
  // Handle /api/devices/[id] - specific device operations by numeric ID
  else if (deviceSegments.length === 1) {
    const deviceParam = deviceSegments[0];
    const isNumericId = !isNaN(Number(deviceParam));
    
    if (isNumericId) {
      const deviceId = parseInt(deviceParam);
      
      if (method === 'GET') {
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
      // If not numeric, return error
      return new Response(JSON.stringify({ error: 'Device ID must be numeric' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } 
  // Handle /api/devices/[codename]/roms - ROM operations for specific device
  else if (deviceSegments.length === 2 && deviceSegments[1] === 'roms') {
    const deviceCodename = deviceSegments[0];
    
    if (method === 'GET') {
      try {
        const { data, error } = await supabase
          .from('roms')
          .select('*')
          .eq('device_codename', deviceCodename)
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching ROMs for device from Supabase:', error);
          throw error;
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

        if (error) {
          console.error('Error adding ROM to device from Supabase:', error);
          throw error;
        }

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
    return new Response(JSON.stringify({ error: 'Invalid device endpoint' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}