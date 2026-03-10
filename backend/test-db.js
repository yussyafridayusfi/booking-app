import "dotenv/config";
import prisma from "./src/lib/prisma.js";

async function main() {

  const table = await prisma.$queryRaw`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
  `;

  console.log(table);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());