const express = require('express');
const machineModel = require('../models/machines.model');

const router = express.Router()


// Pagination function
function paginate(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const all  = await model.countDocuments({});

      const result = {};
      result.count = all;
    // change model.length to model.countDocuments() because you are counting directly from mongodb
      if (endIndex < (await model.countDocuments().exec())) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      try {
  //       .limit(limit).skip(startIndex) replaced the slice method because 
  //       it is done directly from mongodb and they are one of mongodb methods
        result.results = await model.find().limit(limit).skip(startIndex);
        res.paginatedResult = result;
        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }

//Post Method
router.post('/addMachine', async (req, res) => {
    const data = new machineModel({
        name: req.body.name,
        active: req.body.active,
        end_machine: req.body.end_machine,
        notes: req.body.notes,
        price: req.body.price,
        currency: req.body.currency,
        shift: req.body.shift,
        hour: req.body.hour,
        
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
router.get('/getMachines', paginate(machineModel), async (req, res) => {
    try{
        machineModel.find({}).sort({ order: 1 }).then(function (add) {
            res.json(add);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getMachine/:id', async (req, res) => {
    try{
        const data = await machineModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateMachine/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await machineModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/sortMachines', async (req,res) => {

    req.body.forEach(async function (arrayItem) {

        var id = (arrayItem.id != null) ? arrayItem.id : new mongoose.Types.ObjectId(); 
        const filter = { _id: id };
        const update = { 
            name: arrayItem.name,
            active: arrayItem.active,
            end_machine: arrayItem.end_machine,
            notes: arrayItem.notes,
            price: arrayItem.price,
            currency: arrayItem.currency,
            shift: arrayItem.shift,
            hour: arrayItem.hour,
            order: arrayItem.order,

        };

        await machineModel.countDocuments(filter);

        await machineModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
        });
        });
        res.status(200).send("Rows has been Ordered!");

});

//Delete by ID Method
router.delete('/deleteMachine/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await machineModel.findByIdAndDelete(id)
        res.send(`Machine ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search Machine name
router.get("/searchMachine", async (req,res) => {
    try {
        const allAPI = await machineModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allAPI || allAPI.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allAPI)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

// Search active
router.get("/searchActive", async (req,res) => {
    try {
        const allAPI = await machineModel.find({ active : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allAPI || allAPI.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allAPI)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

// Search end_machine
router.get("/searchEndMachine", async (req,res) => {
    try {
        const allAPI = await machineModel.find({ end_machine : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allAPI || allAPI.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allAPI)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search Price
router.get("/searchPrice", async (req,res) => {
    try {
        const allAPI = await machineModel.find({ price : req.query.text });
        if(!allAPI || allAPI.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allAPI)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})


// Search Currency
router.get("/searchMachineCurrency", async (req,res) => {
    try {
        const allAPI = await machineModel.find({ currency : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allAPI || allAPI.length === 0){
            res.status(400).send({error : "No Data found"});
        }else{
            res.status(200).send(allAPI)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
