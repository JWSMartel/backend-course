import express from "express";
import {config} from "dotenv";
import movieRoutes from './routes/movieRoutes.js';
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js';

config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/movies",movieRoutes);
app.use("/auth",authRoutes);

const PORT = 5001;
const server = app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});

//3 situations that could need disconnect
//Handle unhandled promise rejections such as database connection errors
process.on("unhandledRejection",(err) =>{
    console.error("Unhandled Rejections:",err);
    server.close(async()=>{
        await disconnectDB();
        process.exit(1);
    });
});

//Handle uncaught exceptions
process.on("uncaughtException",async (err) =>{
    console.error("Uncaught Excpetion:",err);
    await disconnectDB();
    process.exit(1);
});

//Graceful shutdown
process.on("SIGTERM",async () =>{
    console.log("SIGTERM received, shutting down");
    server.close(async()=>{
        await disconnectDB();
        process.exit(0);
    });
});

//GET, POST, PUT, DELETE

//AUTH - signin, signup
//MOVIE - GETTING ALL MOVIES
//USER - Profile
//WATCHLIST