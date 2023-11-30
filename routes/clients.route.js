const express = require('express');
const clientModel = require('../models/clients.model');
const config = require('../config/lib');

const router = express.Router()

//Post Method
router.post('/addClient', async (req, res) => {
    const data = new clientModel({
        name: req.body.name,
        active: req.body.active,
        address: req.body.address,
        tax: req.body.tax,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        postal: req.body.postal,
        web: req.body.web,
        comments: req.body.comments

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
router.get('/getClients', config.paginate(clientModel), async (req, res) => {
    try{
        clientModel.find({}).then(function (tag) {
            res.json(tag);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getClient/:id', async (req, res) => {
    try{
        const data = await clientModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateClient/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await clientModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/deleteClient/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await clientModel.findByIdAndDelete(id)
        res.send(`Client ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search name
router.get("/searchClientName", async (req,res) => {
    try {
        const allClient = await clientModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

// Search Active
router.get("/searchClientActive", async (req,res) => {
    try {
        const allClient = await clientModel.find({ active : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search TAX
router.get("/searchClientTax", async (req,res) => {
    try {
        const allClient = await clientModel.find({ tax : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search Address
router.get("/searchClientAddress", async (req,res) => {
    try {
        const allClient = await clientModel.find({ address : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search City
router.get("/searchClientCity", async (req,res) => {
    try {
        const allClient = await clientModel.find({ city : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search Postal
router.get("/searchClientPostal", async (req,res) => {
    try {
        const allClient = await clientModel.find({ postal : req.query.text });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search Phone
router.get("/searchClientPhone", async (req,res) => {
    try {
        const allClient = await clientModel.find({ phone : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search Web
router.get("/searchClientWeb", async (req,res) => {
    try {
        const allClient = await clientModel.find({ web : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search comments
router.get("/searchClientComments", async (req,res) => {
    try {
        const allClient = await clientModel.find({ comments : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allClient || allClient.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allClient)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


module.exports = router;
