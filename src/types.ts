// types.ts
export interface Device {
  id: number;
  name: string;
  codename: string;
  roms: number;
  status: 'Active' | 'Inactive';
  lastUpdate: string;
}

export interface Rom {
  id: number;
  device: string;
  deviceCodename: string;
  romType: 'SleepOS' | 'AOSP' | 'Port';
  version: string;
  size: string;
  downloads: number;
  status: 'Active' | 'Inactive';
  uploadDate: string;
  downloadUrl: string;
  changelog: string;
  notes?: string;
}

export interface Application {
  id: number;
  name: string;
  email: string;
  role: string;
  portfolio: string;
  message: string;
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
  date: string;
  cv?: string;
}

export interface Changelog {
  id: number;
  device: string;
  romType: 'SleepOS' | 'AOSP' | 'Port';
  version: string;
  date: string;
  changelog: string;
  status: 'Draft' | 'Published';
}

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