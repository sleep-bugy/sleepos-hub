// api/devices/index.ts - Handle all devices operations (GET/POST)
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

  if (method === 'GET') {
    // Get all devices
    try {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching devices from Supabase:', error);
        throw new Error(error.message);
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
    // Add new device
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
        throw new Error(error.message);
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

  return new Response(null, { status: 405 });
}