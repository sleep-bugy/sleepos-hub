// api/devices/[id].ts - Handle specific device operations and device roms using Supabase REST API
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Initialize environment variables
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return new Response(
      JSON.stringify({ error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const url = new URL(request.url);
  const path = url.pathname;
  const pathSegments = path.split('/').filter(Boolean);

  // Extract the device identifier and potential action
  if (pathSegments.length >= 3 && pathSegments[0] === 'api' && pathSegments[1] === 'devices') {
    const deviceIdentifier = pathSegments[2];
    const action = pathSegments[3]; // Could be 'roms' or undefined

    const { method } = request;

    if (action === 'roms') {
      // Handle /api/devices/[codename]/roms
      if (method === 'GET') {
        // Get ROMs for specific device by codename
        try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/roms?select=*&device_codename=eq.${deviceIdentifier}&order=id.asc`, {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error fetching ROMs for device:', error);
          return new Response(JSON.stringify({ error: 'Failed to fetch ROMs for device' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else if (method === 'POST') {
        // Add ROM to specific device
        try {
          const newRomData = await request.json();

          const response = await fetch(`${SUPABASE_URL}/rest/v1/roms`, {
            method: 'POST',
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({
              device_codename: deviceIdentifier,
              rom_type: newRomData.romType,
              version: newRomData.version,
              size: newRomData.size,
              maintainer: newRomData.maintainer,
              download_url: newRomData.downloadUrl,
              changelog: newRomData.changelog,
              notes: newRomData.notes || null,
              status: newRomData.status,
              upload_date: newRomData.uploadDate || new Date().toISOString().split('T')[0],
              downloads: 0 // Initialize with 0 downloads
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to add ROM: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Error adding ROM to device:', error);
          return new Response(JSON.stringify({ error: 'Failed to add ROM to device' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    } else {
      // Handle operations on a specific device by ID or codename
      // First, check if the identifier is a number (ID) or string (codename)
      const isDeviceIdNumeric = !isNaN(Number(deviceIdentifier));

      if (isDeviceIdNumeric) {
        // Handle by numeric ID
        const deviceId = parseInt(deviceIdentifier);

        if (method === 'GET') {
          try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/devices?select=*&id=eq.${deviceId}`, {
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              if (response.status === 404) {
                // Row not found
                return new Response(JSON.stringify({ error: 'Device not found' }), {
                  status: 404,
                  headers: { 'Content-Type': 'application/json' }
                });
              }
              throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              return new Response(JSON.stringify(data[0]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } else {
              return new Response(JSON.stringify({ error: 'Device not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          } catch (error) {
            console.error('Error fetching device:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'PUT') {
          try {
            const updateData = await request.json();

            const response = await fetch(`${SUPABASE_URL}/rest/v1/devices?id=eq.${deviceId}`, {
              method: 'PATCH',
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
              },
              body: JSON.stringify({
                name: updateData.name,
                codename: updateData.codename,
                status: updateData.status,
                last_update: new Date().toISOString().split('T')[0]
              }),
            });

            if (!response.ok) {
              throw new Error(`Failed to update device: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error('Error updating device:', error);
            return new Response(JSON.stringify({ error: 'Failed to update device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } else if (method === 'DELETE') {
          try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/devices?id=eq.${deviceId}`, {
              method: 'DELETE',
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`Failed to delete device: ${response.status} ${response.statusText}`);
            }

            return new Response(null, {
              status: 204
            });
          } catch (error) {
            console.error('Error deleting device:', error);
            return new Response(JSON.stringify({ error: 'Failed to delete device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } else {
        // Handle by codename
        if (method === 'GET') {
          try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/devices?select=*&codename=eq.${deviceIdentifier}`, {
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              if (response.status === 404) {
                // Row not found
                return new Response(JSON.stringify({ error: 'Device not found' }), {
                  status: 404,
                  headers: { 'Content-Type': 'application/json' }
                });
              }
              throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              return new Response(JSON.stringify(data[0]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } else {
              return new Response(JSON.stringify({ error: 'Device not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          } catch (error) {
            console.error('Error fetching device by codename:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch device' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      }
    }
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}