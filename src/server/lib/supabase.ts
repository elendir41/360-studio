import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';
import * as schema from '../schema';

const connectionString = process.env.POSTGRES_URL!;

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const client = postgres(connectionString);
const db = drizzle(client, { schema });

const bucket = supabase.storage.from(process.env.STORAGE_BUCKET!);

export { db, bucket };
export default supabase;
