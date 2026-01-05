import express from "express";
import { register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

//testing
router.get("/",(req, res)=>{
    res.json({httpMethod:"works"});
});

export default router;