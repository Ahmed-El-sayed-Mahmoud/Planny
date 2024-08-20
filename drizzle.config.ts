
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/Planny.Infrastructure/db/schema.ts',
  out: './src/Planny.Infrastructure/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});