import express from "express";

import movieRoutes from './routes/movieRoutes.js';

const app = express();

app.use("/movies",movieRoutes);

const PORT = 5001;
const server = app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});

//GET, POST, PUT, DELETE

//AUTH - signin, signup
//MOVIE - GETTING ALL MOVIES
//USER - Profile
//WATCHLIST