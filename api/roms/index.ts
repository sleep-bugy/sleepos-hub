// api/roms/index.ts - Handle all ROMs data (GET)
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
    // Get all ROMs
    try {
      const { data, error } = await supabase
        .from('roms')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching all ROMs from Supabase:', error);
        throw new Error(error.message);
      }

      return new Response(JSON.stringify(data || []), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching all ROMs:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch ROMs' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Other methods are not supported for this endpoint
  return new Response(null, { status: 405 });
}