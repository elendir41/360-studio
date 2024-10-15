import { sql } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';

const sqlTextSearch = (column: PgColumn, value: string) =>
  sql`lower(${column}) like '%' || ${value.toLowerCase()} || '%'`;

export default sqlTextSearch;
