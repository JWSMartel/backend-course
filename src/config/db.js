import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
    log:process.env.NOD_ENV==="development"?["query","error","warn"]:["error"],
});

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