import express from "express";

const router = express.Router();

//Front end gets data
router.get("/",(req, res)=>{
    res.json({httpMethod:"get"});
});
//Creating data
router.post("/",(req, res)=>{
    res.json({httpMethod:"post"});
});
//Updating data
router.put("/",(req, res)=>{
    res.json({httpMethod:"put"});
});
//Removing data
router.delete("/",(req, res)=>{
    res.json({httpMethod:"delete"});
});

export default router;