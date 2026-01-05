import express from "express";
import { addToWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/", addToWatchlist);

//testing
router.get("/",(req, res)=>{
    res.json({httpMethod:"works"});
});

export default router;