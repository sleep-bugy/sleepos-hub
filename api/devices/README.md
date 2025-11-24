# Database Integration Guide for Production

## Problem Statement
The current implementation uses mock data that resets on every request. In a serverless environment like Vercel, functions cannot maintain state between requests, so data added to in-memory variables gets lost.

## Solution: Production Database Integration

### 1. Database Setup Options

Choose one of these database solutions:
- Vercel Postgres (Integrated with Vercel)
- Supabase (Free tier available)
- PlanetScale MySQL
- MongoDB Atlas

### 2. Environment Variables
Add these to your Vercel project settings:
```bash
# For Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# For Vercel Postgres
DATABASE_URL=your_postgres_connection_string
```

### 3. Required Dependencies
```bash
npm install @supabase/supabase-js
# OR
npm install @vercel/postgres
```

### 4. Database Schema
You'll need to create tables for your entities:
```sql
-- Devices table
CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  codename VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'Active',
  last_update DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ROMs table
CREATE TABLE roms (
  id SERIAL PRIMARY KEY,
  device_id INTEGER REFERENCES devices(id),
  device_codename VARCHAR(100),
  rom_type VARCHAR(20),
  version VARCHAR(50),
  size VARCHAR(20),
  downloads INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'Active',
  upload_date DATE,
  download_url TEXT,
  changelog TEXT,
  notes TEXT,
  maintainer VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Update API Routes
Replace the mock data implementation with actual database queries.

### 6. Update dataService.ts
Modify the dataService to work with the database-connected API.

## Important Notes
- The current implementation works for demonstration purposes
- For production, you MUST connect to a real database
- Without a database, data will not persist between requests
- All changes will be lost when the serverless function execution completes