// types.ts - Defines the data types for the application

// Type for ROMs
export interface Rom {
  id: number;
  device: string; // Display name of the device
  deviceCodename: string; // Codename of the device (e.g., cepheus, surya)
  maintainer: string;
  romType: 'SleepOS' | 'AOSP' | 'Port'; // Type of ROM
  version: string; // Version of the ROM (e.g., v2.3.1)
  size: string; // Size of the ROM (e.g., 1.2 GB)
  downloads: number; // Number of downloads
  status: 'Active' | 'Inactive'; // Status of the ROM
  uploadDate: string; // Date when uploaded (YYYY-MM-DD format)
  downloadUrl: string; // URL to download the ROM
  changelog: string; // Changelog in markdown format
  notes?: string; // Additional notes or instructions
}

// Type for Devices
export interface Device {
  id: number;
  name: string; // Human-readable name of the device (e.g., "Xiaomi Mi 9")
  codename: string; // Codename of the device (e.g., "cepheus")
  status: 'Active' | 'Inactive'; // Whether the device is actively maintained
  lastUpdate: string; // Last update date (YYYY-MM-DD format)
  roms: Rom[]; // Array of ROMs available for this device
}

// Type for Team Applications
export interface Application {
  id: number;
  name: string;
  email: string;
  role: string; // Role the applicant wants (e.g., "Developer", "Maintainer", "Tester")
  portfolio: string; // GitHub/Portfolio link
  message: string; // Application message
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected'; // Application status
  date: string; // Application date (YYYY-MM-DD format)
  cv?: string; // Optional CV/Resume link
}

// Type for Changelogs
export interface Changelog {
  id: number;
  device: string; // Device for which the changelog applies
  romType: 'SleepOS' | 'AOSP' | 'Port'; // Type of ROM the changelog is for
  version: string; // Version of the ROM
  date: string; // Date of the release (YYYY-MM-DD format)
  changelog: string; // Changelog in markdown format
  status: 'Draft' | 'Published'; // Status of the changelog
}

// Type for Site Settings
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  discordLink: string;
  telegramLink: string;
  downloadServer: string;
  enableDownloads: boolean;
  enableTeamApplications: boolean;
}

// Type for User
export interface User {
  id: number;
  email: string;
  password: string; // In production, this would be hashed
  role: 'admin' | 'moderator' | 'user'; // User role
}