import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { postData, getURL } from '@/libs/helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check the x-keep-alive-api-secret header for authorization
  const keepAliveApiSecret = req.headers['x-keep-alive-api-secret'];
  if (keepAliveApiSecret !== process.env.KEEP_ALIVE_API_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    // Check if the 'Cron' table exists in the database
    const tableExists = await supabase
      .rpc('table_exists', { table_name: 'Cron' })
      .then(({ data }) => data?.table_exists || false);

    if (!tableExists) {
      // Create the 'Cron' table
      await supabase.rpc('create_table', {
        table_name: 'Cron',
        columns: [
          { name: 'id', type: 'uuid', primary_key: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'count', type: 'integer' },
        ],
      });

      // Insert a new entry with an initial count of 1
      const data = await postData({
        url: `${getURL()}/api/keep-alive`,
      });

      res.status(200).json(data);
    } else {
      // Increment the count of the first entry and log it
      const data = await postData({
        url: `${getURL()}/api/keep-alive`,
      });

      console.log('Updated count:', data?.count);

      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
}
