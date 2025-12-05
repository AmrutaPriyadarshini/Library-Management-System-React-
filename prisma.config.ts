import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma", // path to your schema
  migrations: {
    path: "prisma/migrations",    // folder for migrations
  },
  datasource: {
    adapter: "postgresql",        // database type
    url: env("DATABASE_URL"),     // load from .env
  },
});