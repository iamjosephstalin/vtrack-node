const express = require('express');
const unitModel = require('../models/units.model');

const router = express.Router()

//Post Method
router.post('/addunit', async (req, res) => {
    const data = new unitModel({
        name: req.body.name,
        default: req.body.default
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
router.get('/getunits',  async (req, res) => {
    try{
        unitModel.find({}).then(function (unit) {
            res.json(unit);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getUnit/:id', async (req, res) => {
    try{
        const data = await unitModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateUnit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await unitModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/deleteUnit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await unitModel.findByIdAndDelete(id)
        res.send(`Unit ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search Roles
router.get("/searchUnit", async (req,res) => {
    try {
        const allUnit = await unitModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allUnit || allUnit.length === 0){
            res.status(400).send({error : "No Role was found"});
        }else{
            res.status(200).send(allUnit)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
