import express from "express";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login",login);

router.post("/logout",logout);

//testing
router.get("/",(req, res)=>{
    res.json({httpMethod:"works"});
});

export default router;