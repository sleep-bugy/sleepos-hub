# Vercel + Supabase Deployment Guide

## Database Schema Setup

1. Log into your Supabase dashboard
2. Go to SQL Editor
3. Run the commands from `supabase_schema.sql` to create the required tables

## Environment Variables

Set these in your Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=https://qcahirjygiqcecslxzse.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYWhpcmp5Z2lxY2Vjc2x4enNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDU4ODIsImV4cCI6MjA3OTU4MTg4Mn0.pGGrbOepkGp8x1n7SqXE56_giECiXhv-AcBwTYceAi0
```

## API Endpoints Available

The application uses these backend endpoints:

### Devices
- `GET /api/devices` - Get all devices
- `POST /api/devices` - Add new device
- `GET /api/devices/[id]` - Get specific device
- `PUT /api/devices/[id]` - Update specific device
- `DELETE /api/devices/[id]` - Delete specific device

### ROMs
- `GET /api/roms` - Get all ROMs
- `GET /api/devices/[codename]/roms` - Get ROMs for specific device
- `POST /api/devices/[codename]/roms` - Add ROM to specific device

### Applications
- `GET /api/applications` - Get all team applications
- `POST /api/applications` - Submit new team application
- `PUT /api/applications/[id]` - Update team application status

### Changelogs
- `GET /api/changelogs` - Get all changelogs
- `POST /api/changelogs` - Add new changelog
- `PUT /api/changelogs/[id]` - Update specific changelog
- `DELETE /api/changelogs/[id]` - Delete specific changelog

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings

### User
- `GET /api/user` - Get current user
- `PUT /api/user` - Update user information

## Deployment Steps

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add the environment variables in Vercel dashboard (Settings → Environment Variables)
4. Deploy the application

## Key Features

✅ All admin panel changes are now persistent and visible to all users  
✅ Data is stored in Supabase database and shared globally  
✅ No more data loss after browser refresh  
✅ All CRUD operations work with real database  
✅ Authentication protected admin panel  

After deployment, all changes made in the admin dashboard (adding/removing ROMs, devices, applications, etc.) will be immediately visible to all users since the data is stored centrally in your Supabase database.