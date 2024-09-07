import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import config from '../config';

const migrationClient = postgres(config.databaseUrl, {
  max: 1,
});

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './drizzle/migrations',
  });
  await migrationClient.end();
}

main();
