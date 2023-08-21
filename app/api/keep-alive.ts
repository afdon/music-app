import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/libs/supabaseAdmin';

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
    const tableExists = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'cron');

    if (tableExists.data?.length === 0) {
      // Create the 'Cron' table if it doesn't exist
      await supabaseAdmin
        .from('cron')
        .upsert([{ count: 1 }]); // Create an entry with count = 1
      console.log('Created "cron" table and inserted initial entry.');
    } else {
      // Retrieve the first entry from the 'Cron' table
      const existingEntry = await supabaseAdmin
        .from('cron')
        .select()
        .limit(1);

      if (existingEntry.data?.length === 0) {
        // Insert an entry with count = 1 if there's no existing entry
        await supabaseAdmin
          .from('cron')
          .upsert([{ count: 1 }]);
        console.log('Inserted initial entry into "cron" table.');
      } else {
        // Increment the count and log the value
        const { count } = existingEntry.data![0];
        const updatedEntry = await supabaseAdmin
          .from('cron')
          .upsert([{ count: count + 1 }]);
        console.log('Incremented "cron" table entry:', updatedEntry.data![0]);
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
}
