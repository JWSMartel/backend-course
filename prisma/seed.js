import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const creatorId = "2fea71b8-dad8-4142-8d28-018b769b4271";
const movies = [
    {
        title:"Interstellar",
        overview:"A team of explorers travel through a wormhold",
        releaseYear:2014,
        genres:["Adventure","Drama","Sci-Fi"],
        runtime:169,
        posterUrl:"https://example.com/intersteller.jpg",
        createdBy:useImperativeHandle,
    },
    {
        title:"The Shawshank Redemption",
        overview:"Two imprisoned men bond",
        releaseYear:1994,
        genres:["Drama"],
        runtime:142,
        posterUrl:"https://example.come/shawshank.jpg",
        createdBy:userId,
    }
];

const main = async () =>{
    console.log("Seeding movies...");
    for(const movie of movies){
        await prisma.movie.create({
            data:movie,
        });
        console.log(`Created movie: ${movie.title}`);
    }
    console.log("Seeding completed!");
};

main()
    .catch((err)=>{
        console.error(err);
        proces.exit(1);
    })
    .finally(async()=>{
        await prisma.$disconnect();
    })
