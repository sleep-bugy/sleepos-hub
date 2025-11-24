# Supabase Integration Setup

## Required Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the Supabase dashboard
3. Add the following environment variables to your Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

You'll need to create the following tables in your Supabase project:

### devices table
```
id - integer, primary key, auto-increment
name - text, not null
codename - text, unique, not null
status - text, default: 'Active'
last_update - date
roms - jsonb (for storing ROMs as JSON array)
```

### roms table
```
id - integer, primary key, auto-increment
device_codename - text, not null
rom_type - text (values: 'SleepOS', 'AOSP', 'Port')
version - text
size - text
maintainer - text
download_url - text
changelog - text
notes - text
status - text (values: 'Active', 'Inactive')
upload_date - date
downloads - integer, default: 0
```

### applications table
```
id - integer, primary key, auto-increment
name - text, not null
email - text, not null
role - text
portfolio - text
message - text
status - text (values: 'Pending', 'Reviewed', 'Accepted', 'Rejected'), default: 'Pending'
date - date
cv - text
```

### changelogs table
```
id - integer, primary key, auto-increment
device - text
rom_type - text (values: 'SleepOS', 'AOSP', 'Port')
version - text
date - date
changelog - text
status - text (values: 'Draft', 'Published'), default: 'Draft'
```

### settings table
```
id - integer, primary key
site_name - text, default: 'Project Sleep'
site_description - text
contact_email - text
discord_link - text
telegram_link - text
download_server - text
enable_downloads - boolean, default: true
enable_team_applications - boolean, default: true
```

### users table
```
id - integer, primary key, auto-increment
email - text, unique, not null
password - text, not null (should be hashed in production)
role - text (values: 'admin', 'moderator', 'user'), default: 'user'
```

## Running Locally

For local development, create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deploying to Vercel

When deploying to Vercel, add the environment variables in the Vercel dashboard under Settings → Environment Variables.

## Important Notes

- Make sure to properly hash user passwords in production
- The tables should be created in your Supabase project before running the application
- The application expects these exact table and column names