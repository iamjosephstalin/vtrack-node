const express = require('express');
const APIModel = require('../models/api.model');

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
router.post('/addAPI', async (req, res) => {
    const data = new APIModel({
        api: req.body.api,
        status: req.body.status,
        products: req.body.products,
        orders: req.body.orders,
        files: req.body.files,
        clients: req.body.clients,

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
router.get('/getAPI', paginate(APIModel), async (req, res) => {
    try{
        APIModel.find({}).then(function (tag) {
            res.json(tag);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getAPI/:id', async (req, res) => {
    try{
        const data = await APIModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateAPI/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await APIModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/deleteAPI/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await APIModel.findByIdAndDelete(id)
        res.send(`API ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search Tagname
router.get("/searchAPI", async (req,res) => {
    try {
        const allAPI = await APIModel.find({ api : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allAPI || allAPI.length === 0){
            res.status(400).send({error : "No API was found"});
        }else{
            res.status(200).send(allAPI)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
