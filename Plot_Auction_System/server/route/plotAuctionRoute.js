const express = require('express');
const router = express.Router();
const db= require('../config/database')





router.get('/getAllPlotsInAuction',async(req,res)=>{
try {

    const collectionPlot = await db.getCollection('plots');

    const plots = await collectionPlot.find({}).toArray();

    res.status(200).json({status:"true",plotList:plots });

} catch (error) {
    res.status(500).json({ error:error });
}


  
  
})



module.exports=router