import { execSync } from "child_process";

const VERCEL_ENV = process.env.VERCEL_ENV;

if (VERCEL_ENV === "production") {
  console.log("Running database migrations for production...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✓ set" : "✗ missing");
  console.log("POSTGRES_URL:", process.env.POSTGRES_URL ? "✓ set" : "✗ missing");
  
  try {
    execSync("pnpm db:migrate", { 
      stdio: "pipe",  // 👈 cambiá a pipe
      encoding: "utf8"
    });
    console.log("Migrations completed successfully");
  } catch (error: any) {
    console.error("STDOUT:", error.stdout);  // 👈 esto va a mostrar el error real
    console.error("STDERR:", error.stderr);
    console.error("Migration failed:", error.message);
    process.exit(1);
  }
} else {
  console.log(`Skipping migrations (VERCEL_ENV=${VERCEL_ENV ?? "not set"})`);
}
