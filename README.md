# Project Sleep - Custom ROM Manager

A comprehensive dashboard for managing custom ROMs (SleepOS, AOSP, Ports) for various devices.

## Features

- 📱 Device management (view, add, edit, delete)
- 📦 ROM management (add, update ROMs for devices)
- 👥 Team application management
- 📝 Changelog management
- ⚙️ Site settings configuration
- 🔐 Admin authentication

## Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account with project credentials

## Setup for Development

1. Clone the repository:
   ```bash
   git clone YOUR_REPO_URL
   cd sleepos-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:5173` to view the application

## Database Configuration

Before running the application, make sure to create the necessary tables in your Supabase database using the following SQL:

```sql
-- Tabel devices
CREATE TABLE IF NOT EXISTS devices (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  codename TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'Active',
  last_update DATE,
  roms JSONB DEFAULT '[]'::jsonb
);

-- Tabel roms
CREATE TABLE IF NOT EXISTS roms (
  id BIGSERIAL PRIMARY KEY,
  device_codename TEXT NOT NULL,
  rom_type TEXT NOT NULL,
  version TEXT NOT NULL,
  size TEXT,
  maintainer TEXT,
  download_url TEXT,
  changelog TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Active',
  upload_date DATE,
  downloads INTEGER DEFAULT 0
);

-- Tabel applications
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  portfolio TEXT,
  message TEXT,
  cv TEXT,
  status TEXT DEFAULT 'Pending',
  date DATE
);

-- Tabel changelogs
CREATE TABLE IF NOT EXISTS changelogs (
  id BIGSERIAL PRIMARY KEY,
  device TEXT,
  rom_type TEXT,
  version TEXT,
  date DATE,
  changelog TEXT,
  status TEXT DEFAULT 'Draft'
);

-- Tabel settings
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT,
  site_description TEXT,
  contact_email TEXT,
  discord_link TEXT,
  telegram_link TEXT,
  download_server TEXT,
  enable_downloads BOOLEAN DEFAULT true,
  enable_team_applications BOOLEAN DEFAULT true
);

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- In production, this should be hashed
  role TEXT DEFAULT 'user'
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_roms_device ON roms(device_codename);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_changelogs_device ON changelogs(device);
```

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add the environment variables in Vercel's dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy your application

After deployment, all changes made in the admin panel will be persisted in the Supabase database and shared across all users.

## Admin Panel Access

The admin panel is accessible at `/admin` in the application. You can log in using:

- Email: `admin@projectsleep.com`
- Password: `admin123` (these are configurable in the database)

## Support

If you encounter any issues or have questions, feel free to reach out.

---

Made with ❤️ for the custom ROM community