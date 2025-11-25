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

Before running the application, make sure to create the necessary tables in your Supabase database using the schema provided in `supabase_schema.sql`:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the SQL commands from `supabase_schema.sql` or run:
   ```bash
   # If using the CLI or importing via SQL Editor
   psql -d your_supabase_db -f supabase_schema.sql
   ```

This will create all the necessary tables for devices, ROMs, applications, changelogs, settings, and user management.

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add the environment variables in Vercel's dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://qcahirjygiqcecslxzse.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYWhpcmp5Z2lxY2Vjc2x4enNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDU4ODIsImV4cCI6MjA3OTU4MTg4Mn0.pGGrbOepkGp8x1n7SqXE56_giECiXhv-AcBwTYceAi0`
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