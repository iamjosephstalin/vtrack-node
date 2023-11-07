const express = require('express');
const currencyModel = require('../models/currencies.model');

const router = express.Router()

// Upsert data 
router.post('/addCurrency', async (req,res) => {

    var query = {
                'name': req.body.name,
                'default': req.body.default
                };
    console.log(query);
    req.newData.username = req.user.username;

    MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
});

//Post Method
router.post('/addCurrency', async (req, res) => {
    const data = new currencyModel({
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
router.get('/getCurrencies',  async (req, res) => {
    try{
        currencyModel.find({}).then(function (currency) {
            res.json(currency);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getCurrency/:id', async (req, res) => {
    try{
        const data = await currencyModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateCurrency/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await currencyModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/deleteCurrency/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await currencyModel.findByIdAndDelete(id)
        res.send(`Currency ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search Currency
router.get("/searchCurrency", async (req,res) => {
    try {
        const allCurrency = await currencyModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allCurrency || allCurrency.length === 0){
            res.status(400).send({error : "No Currency was found"});
        }else{
            res.status(200).send(allCurrency)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
