const express = require('express');
const vatModel = require('../models/vat.model');

const router = express.Router()

//Post Method
router.post('/addVAT', async (req, res) => {
    const data = new vatModel({
        name: req.body.name,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

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

        res.send(result)
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
