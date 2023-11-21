const express = require('express');
const mongoose = require('mongoose');
const vatModel = require('../models/vat.model');

const router = express.Router()


// Upsert data 
router.post('/addVAT', async (req,res) => {

    req.body.forEach(async function (arrayItem) {

        var id = (arrayItem.id != null) ? arrayItem.id : new mongoose.Types.ObjectId(); 
        const filter = { _id: id };
        const update = { name: arrayItem.name};

        await vatModel.countDocuments(filter);

        await vatModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
        });
        });
        res.send("VAT Data has been Stored Successfully");

});

//Get all Method
router.get('/getVAT',  async (req, res) => {
    try{
        vatModel.find({}).then(function (vat) {
            res.json(vat);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getVAT/:id', async (req, res) => {
    try{
        const data = await vatModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateVAT/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await vatModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/deleteVAT/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await vatModel.findByIdAndDelete(id)
        res.send(`VAT ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search VAT
router.get("/searchVAT", async (req,res) => {
    try {
        const allVAT = await vatModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allVAT || allVAT.length === 0){
            res.status(400).send({error : "No VAT was found"});
        }else{
            res.status(200).send(allVAT)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
