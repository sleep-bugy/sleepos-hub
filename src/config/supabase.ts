// Supabase client configuration for database access
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
// PERBAIKAN: Menggunakan import.meta.env untuk Vite
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

// Create Supabase client
export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Type definitions matching the database schema
export interface DeviceDb {
  id: number;
  name: string;
  codename: string;
  status: string;
  last_update: string;
  roms: any[];
}

export interface RomDb {
  id: number;
  device_codename: string;
  rom_type: string;
  version: string;
  size: string;
  maintainer: string;
  download_url: string;
  changelog: string;
  notes: string | null;
  status: string;
  upload_date: string;
  downloads: number;
}

export interface ApplicationDb {
  id: number;
  name: string;
  email: string;
  role: string;
  portfolio: string;
  message: string;
  cv: string | null;
  status: string;
  date: string;
}

export interface ChangelogDb {
  id: number;
  device: string;
  rom_type: string;
  version: string;
  date: string;
  changelog: string;
  status: string;
}

export interface SettingsDb {
  id: number;
  site_name: string;
  site_description: string;
  contact_email: string;
  discord_link: string;
  telegram_link: string;
  download_server: string;
  enable_downloads: boolean;
  enable_team_applications: boolean;
}

export interface UserDb {
  id: number;
  email: string;
  password: string;
  role: string;
}