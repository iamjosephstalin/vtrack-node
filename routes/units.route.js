const express = require('express');
const unitModel = require('../models/units.model');

const router = express.Router()


// Upsert data 
router.post('/addUnit', async (req,res) => {

    req.body.forEach(async function (arrayItem) {

        const filter = { _id: arrayItem.id };
        const update = { name: arrayItem.name, default: arrayItem.default };

        await unitModel.countDocuments(filter);

        await unitModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
        });
        });
        res.send("Unit Data has been Stored Successfully");

});

//Get all Method
router.get('/getUnits',  async (req, res) => {
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

// Search Unit
router.get("/searchUnit", async (req,res) => {
    try {
        const allUnit = await unitModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allUnit || allUnit.length === 0){
            res.status(400).send({error : "No Unit was found"});
        }else{
            res.status(200).send(allUnit)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
