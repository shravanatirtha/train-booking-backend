const express= require("express");
const router=express.Router();
const {createTrain,getTrain,home}=require("../controllers/auth");
router.get("/",home);
router.post("/createTrain",createTrain);
router.post("/getTrain",getTrain);
module.exports=router;