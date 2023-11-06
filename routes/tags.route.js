const express = require('express');
const tagModel = require('../models/tags.model');

const router = express.Router()

//Post Method
router.post('/addTag', async (req, res) => {
    const data = new tagModel({
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
router.get('/getTags',  async (req, res) => {
    try{
        tagModel.find({}).then(function (tag) {
            res.json(tag);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getTag/:id', async (req, res) => {
    try{
        const data = await tagModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateTag/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await tagModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/deleteTag/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await tagModel.findByIdAndDelete(id)
        res.send(`Tag ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search Roles
router.get("/searchTag", async (req,res) => {
    try {
        const allTag = await tagModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allTag || allTag.length === 0){
            res.status(400).send({error : "No Role was found"});
        }else{
            res.status(200).send(allTag)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
