// api/devices/[codename]/roms.ts - Handle ROMs for specific devices
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

  // Extract the device codename from the path
  // Expected path format: /api/devices/[codename]/roms
  const deviceCodename = pathSegments[pathSegments.length - 2]; // Get second-to-last segment which is the codename

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
  } else {
    return new Response(null, { status: 405 });
  }
}