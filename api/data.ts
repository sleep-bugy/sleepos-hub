import { json, error } from 'itty-router';
import { get, put } from '@vercel/blob';
import { createClient } from '@vercel/postgres';

// Function to get data from blob storage
export async function getBlobData(fileName: string) {
  try {
    const response = await get(`ps_${fileName}.json`);
    if (response) {
      const text = await response.text();
      return JSON.parse(text);
    }
    return null;
  } catch (err) {
    console.error(`Error reading ${fileName} from blob:`, err);
    // Return default data if blob doesn't exist
    return getDefaultData(fileName);
  }
}

// Function to save data to blob storage
export async function saveBlobData(fileName: string, data: any) {
  try {
    const blob = await put(
      `ps_${fileName}.json`,
      JSON.stringify(data),
      { 
        access: 'public',
        contentType: 'application/json',
        token: process.env.BLOB_READ_WRITE_TOKEN 
      }
    );
    return blob;
  } catch (err) {
    console.error(`Error saving ${fileName} to blob:`, err);
    throw err;
  }
}

// Get default data for different types
function getDefaultData(type: string) {
  switch (type) {
    case 'devices':
      return [
        {
          id: 1,
          name: "Xiaomi Mi 9",
          codename: "cepheus",
          status: "Active",
          lastUpdate: "2025-11-15",
          roms: [
            { id: 1, device: "Xiaomi Mi 9", deviceCodename: "cepheus", maintainer: "John Doe", romType: "SleepOS", version: "v2.3.1", size: "1.2 GB", downloads: 1234, status: "Active", uploadDate: "2025-11-15", downloadUrl: "https://example.com/cepheus-sleepos-v2.3.1.zip", changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches" },
            { id: 2, device: "Xiaomi Mi 9", deviceCodename: "cepheus", maintainer: "Jane Smith", romType: "AOSP", version: "v1.5.0", size: "980 MB", downloads: 892, status: "Active", uploadDate: "2025-11-10", downloadUrl: "https://example.com/cepheus-aosp-v1.5.0.zip", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates" }
          ]
        },
        {
          id: 2,
          name: "POCO X3 NFC",
          codename: "surya",
          status: "Active",
          lastUpdate: "2025-11-16",
          roms: [
            { id: 3, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Jane Smith", romType: "SleepOS", version: "v1.2.0", size: "1.8 GB", downloads: 567, status: "Active", uploadDate: "2025-11-20", downloadUrl: "https://example.com/surya-sleepos-v1.2.0.zip", changelog: "# v1.2.0\n- Improved camera performance\n- Enhanced battery life" },
            { id: 4, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Alex Johnson", romType: "AOSP", version: "12.2", size: "1.5 GB", downloads: 321, status: "Active", uploadDate: "2025-11-18", downloadUrl: "https://example.com/surya-aosp-12.2.zip", changelog: "# 12.2\n- Updated to Android 12.2\n- Security patches up to Nov 2025" },
            { id: 5, device: "POCO X3 NFC", deviceCodename: "surya", maintainer: "Sarah Lee", romType: "Port", version: "v3.0.1", size: "2.1 GB", downloads: 123, status: "Active", uploadDate: "2025-11-15", downloadUrl: "https://example.com/surya-port-v3.0.1.zip", changelog: "# v3.0.1\n- Ported OnePlus camera features\n- Added OnePlus gallery app" }
          ]
        }
      ];
    case 'applications':
      return [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Developer", portfolio: "github.com/john", message: "Experienced Android developer with 5 years of experience", status: "Pending", date: "2025-11-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer", portfolio: "dribbble.com/jane", message: "UI/UX designer with focus on Android interfaces", status: "Reviewed", date: "2025-11-14" }
      ];
    case 'changelogs':
      return [
        { id: 1, device: "Xiaomi Mi 9", romType: "SleepOS", version: "v2.3.1", date: "2025-11-15", changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches", status: "Published" },
        { id: 2, device: "OnePlus 7 Pro", romType: "AOSP", version: "v1.5.0", date: "2025-11-10", changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates", status: "Published" }
      ];
    case 'settings':
      return {
        siteName: "Project Sleep",
        siteDescription: "Custom ROMs crafted with care for the community.",
        contactEmail: "contact@projectsleep.com",
        discordLink: "https://discord.gg/sK433E4jq",
        telegramLink: "https://t.me/SleepOsUser",
        downloadServer: "https://downloads.projectsleep.com",
        enableDownloads: true,
        enableTeamApplications: true,
      };
    case 'current_user':
      return {
        id: 1,
        email: "admin@projectsleep.com",
        password: "admin123",
        role: "admin"
      };
    default:
      return null;
  }
}

// API endpoint to get all data
export const GET = async () => {
  try {
    const devices = await getBlobData('devices');
    const applications = await getBlobData('applications');
    const changelogs = await getBlobData('changelogs');
    const settings = await getBlobData('settings');
    const user = await getBlobData('current_user');
    
    return json({
      devices: devices || getDefaultData('devices'),
      applications: applications || getDefaultData('applications'),
      changelogs: changelogs || getDefaultData('changelogs'),
      settings: settings || getDefaultData('settings'),
      currentUser: user || getDefaultData('current_user')
    });
  } catch (err) {
    console.error('Error in GET /api/data:', err);
    return error(500, 'Failed to fetch data');
  }
};

// API endpoint to update data
export const POST = async (request: Request) => {
  try {
    const { type, data } = await request.json();
    
    if (!type || data === undefined) {
      return error(400, 'Missing type or data in request body');
    }
    
    await saveBlobData(type, data);
    
    return json({ success: true, message: `${type} updated successfully` });
  } catch (err) {
    console.error('Error in POST /api/data:', err);
    return error(500, 'Failed to save data');
  }
};

export default {
  GET,
  POST
};