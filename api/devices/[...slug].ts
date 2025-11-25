// api/devices/[...slug].ts - Handle all device-related operations
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

  // Extract the device slug from the path
  // Expected path format options:
  // - /api/devices/[id] - for device operations (GET, PUT, DELETE)
  // - /api/devices/[codename]/roms - for ROM operations on device

  // The slug is the part after /api/devices/
  // Need to find the correct index for slug
  const deviceSegmentIndex = pathSegments.indexOf('devices');
  if (deviceSegmentIndex === -1 || deviceSegmentIndex >= pathSegments.length - 1) {
    return new Response(JSON.stringify({ error: 'Invalid path' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Everything after 'devices' is part of the slug
  const slugParts = pathSegments.slice(deviceSegmentIndex + 1);

  if (slugParts.length === 1) {
    // Handle /api/devices/[id] - numeric ID operations
    const param = slugParts[0];
    const deviceId = parseInt(param);

    if (isNaN(deviceId)) {
      // If it's not a number, it might be codename request which is invalid for this route
      return new Response(JSON.stringify({ error: 'Device ID must be numeric for this endpoint' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Handle device operations by ID
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
  } else if (slugParts.length === 2 && slugParts[1] === 'roms') {
    // Handle /api/devices/[codename]/roms
    const deviceCodename = slugParts[0];
    
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
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}