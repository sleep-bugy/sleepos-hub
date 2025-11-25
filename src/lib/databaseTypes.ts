// config/databaseTypes.ts - Define database-specific types that match the Supabase schema
export interface DeviceDb {
  id: number;
  name: string;
  codename: string;
  status: string; // 'Active' | 'Inactive' in the database
  last_update: string; // Date string in YYYY-MM-DD format
  roms?: any[]; // Array of ROM objects serialized as JSON (may be null in some cases)
}

export interface RomDb {
  id: number;
  device_codename: string; // Foreign key reference to devices table
  rom_type: string; // 'SleepOS' | 'AOSP' | 'Port' in the database
  version: string;
  size: string;
  maintainer: string;
  download_url: string;
  changelog: string;
  notes?: string | null;
  status: string; // 'Active' | 'Inactive' in the database
  upload_date: string; // Date string in YYYY-MM-DD format
  downloads: number; // Number of downloads
  device?: string; // Optional device display name
}

export interface ApplicationDb {
  id: number;
  name: string;
  email: string;
  role: string;
  portfolio: string;
  message: string;
  cv?: string | null;
  status: string; // 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected' in the database
  date: string; // Date string in YYYY-MM-DD format
}

export interface ChangelogDb {
  id: number;
  device: string;
  rom_type: string; // 'SleepOS' | 'AOSP' | 'Port' in the database
  version: string;
  date: string; // Date string in YYYY-MM-DD format
  changelog: string;
  status: string; // 'Draft' | 'Published' in the database
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
  password: string; // In production, this should be hashed
  role: string; // 'admin' | 'moderator' | 'user' in the database
}