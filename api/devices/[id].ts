// api/devices/[id].ts - Handle specific device operations
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

  // Extract the device ID from the path
  // Expected path format: /api/devices/[id]
  const deviceIdStr = pathSegments[pathSegments.length - 1]; // Get the last segment
  const deviceId = parseInt(deviceIdStr);

  if (isNaN(deviceId)) {
    return new Response(JSON.stringify({ error: 'Invalid device ID' }), {
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
  } else {
    return new Response(null, { status: 405 });
  }
}