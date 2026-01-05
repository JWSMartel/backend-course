import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

/*Removing to try and fix versioning issues - real issue ended up being that PrismaClient had /extension on it which it didn't need. Still keeping the adapter since it seems to be required for modern prisma.*/
/*const prisma = new PrismaClient({
    log:process.env.NODE_ENV==="development"?["query","error","warn"]:["error"],
});*/

const connectDB = async () =>{
    try{
        await prisma.$connect();
        console.log("DB Connected via Prisma");
    }catch(error){
        console.log(`DB Connections error: ${error.message}`);
        process.exit(1);
    }
};

const disconnectDB = async () =>{
    await prisma.$disconnect();
};

export {prisma,connectDB,disconnectDB};