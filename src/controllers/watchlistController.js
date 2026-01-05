import {prisma} from "../config/db.js"

const addToWatchlist = async (req,res)=>{
    const {movieId, status,rating, notes, userId} = req.body;

    const movie = await prisma.movie.findUnique({
        where:{id:movieId}
    })

    if(!movie){
        return res.status(404).json({error:"Movie not found"});
    }

    const inWatchlist = await prisma.watchlistItem.findUnique({
        where:{userId_movieId:{
            userId:req.user.id,
            movieId:movieId,
        },},
    });

    if(inWatchlist){
        return res.status(400).json({error:"Movie already in watchlist"});
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data:{
            userId:req.user.id,
            movieId,
            status:status||"PLANNED",
            rating,
            notes,
        },
    });

    res.status(201).json({
        status:"Success",
        data:{
            watchlistItem,
        },
    });
};

const removeFromWatchlist = async(req, res)=>{
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where:{id:req.params.id}
    });

    if(!watchlistItem){
        return res.status(404).json({error:"Watchlist item not found"});
    }

    if(watchlistItem.userId!== req.user.id){
        return res.status(403).json({error:"Not allowed to update this watchlist item"});
    }

    await prisma.watchlistItem.delete({
        where:{id:req.params.id}
    });
    res.status(200).json({
        status:"success",
        message:"Movie removed from watchlist"
    })
};

const updateWatchlistItem = async(req, res)=>{
    const {status, rating, notes} = req.body;
    console.log("STATUS:",status);
    console.log("RATING:",rating);
    console.log("NOTES:",notes);
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where:{id:req.params.id}
    });

    if(!watchlistItem){
        return res.status(404).json({error:"Watchlist item not found"});
    }

    if(watchlistItem.userId!== req.user.id){
        return res.status(403).json({error:"Not allowed to update this watchlist item"});
    }

    const updateData = {};
    if(status !== undefined){
        updateData.status = status.toUpperCase();
        console.log("Status updated");
    }
    if(rating!==undefined){
        updateData.rating = rating;
        console.log("rating updated");
    }
    if(notes !== undefined){
        updateData.notes = notes;
        console.log("notes updated");
    }

    await prisma.watchlistItem.update({
        where:{id:req.params.id},
        data:{
            status:updateData.status,
            rating:updateData.rating,
            notes:updateData.notes,
        }
    });
    res.status(200).json({
        status:"success",
        message:"Movie updated"
    })
}

export {addToWatchlist, removeFromWatchlist, updateWatchlistItem};