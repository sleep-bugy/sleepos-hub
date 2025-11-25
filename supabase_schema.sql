-- Supabase SQL Schema for Project Sleep
-- This creates all the necessary tables for the application

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  codename TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'Active',
  last_update DATE,
  roms JSONB DEFAULT '[]'  -- Store ROMs as JSON array for simplicity
);

-- Create roms table
CREATE TABLE IF NOT EXISTS roms (
  id BIGSERIAL PRIMARY KEY,
  device_codename TEXT NOT NULL, -- References devices(codename) - will be handled in app layer
  rom_type TEXT NOT NULL, -- 'SleepOS', 'AOSP', 'Port'
  version TEXT NOT NULL,
  size TEXT,
  maintainer TEXT,
  download_url TEXT,
  changelog TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Active', -- 'Active', 'Inactive'
  upload_date DATE DEFAULT CURRENT_DATE,
  downloads INTEGER DEFAULT 0
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  portfolio TEXT,
  message TEXT,
  cv TEXT,
  status TEXT DEFAULT 'Pending', -- 'Pending', 'Reviewed', 'Accepted', 'Rejected'
  date DATE DEFAULT CURRENT_DATE
);

-- Create changelogs table
CREATE TABLE IF NOT EXISTS changelogs (
  id BIGSERIAL PRIMARY KEY,
  device TEXT,
  rom_type TEXT, -- 'SleepOS', 'AOSP', 'Port'
  version TEXT,
  date DATE,
  changelog TEXT,
  status TEXT DEFAULT 'Draft' -- 'Draft', 'Published'
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Force single row with id = 1
  site_name TEXT,
  site_description TEXT,
  contact_email TEXT,
  discord_link TEXT,
  telegram_link TEXT,
  download_server TEXT,
  enable_downloads BOOLEAN DEFAULT true,
  enable_team_applications BOOLEAN DEFAULT true
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- In production, this should be a hashed password
  role TEXT DEFAULT 'user' -- 'admin', 'moderator', 'user'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_roms_device_codename ON roms(device_codename);
CREATE INDEX IF NOT EXISTS idx_roms_status ON roms(status);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_changelogs_device ON changelogs(device);

-- Insert default settings if not exists
INSERT INTO settings
  (id, site_name, site_description, contact_email, discord_link, telegram_link, download_server, enable_downloads, enable_team_applications)
VALUES
  (1, 'Project Sleep', 'Custom ROMs crafted with care for the community.', 'contact@projectsleep.com', 'https://discord.gg/sK433E4jq', 'https://t.me/SleepOsUser', 'https://downloads.projectsleep.com', true, true)
ON CONFLICT (id) DO NOTHING;

-- Insert default admin user if not exists
INSERT INTO users
  (email, password, role)
VALUES
  ('admin@projectsleep.com', 'admin123', 'admin')
ON CONFLICT (email) DO NOTHING;