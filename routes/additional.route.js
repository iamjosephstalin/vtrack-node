const express = require('express');
const addModel = require('../models/additional.model');

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
router.post('/addField', async (req, res) => {
    const data = new addModel({
        assigned: req.body.assigned,
        group: req.body.group,
        field: req.body.field
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
router.get('/getField', paginate(addModel), async (req, res) => {
    try{
        addModel.find({}).sort({ order: 1 }).then(function (add) {
            res.json(add);
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getField/:id', async (req, res) => {
    try{
        const data = await addModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateField/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await addModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/sortFields', async (req,res) => {

    req.body.forEach(async function (arrayItem) {        
            const filter = { _id: arrayItem._id };
            const updatedData = arrayItem;
            const options = { new: true };
    
            await addModel.findByIdAndUpdate(
                filter, updatedData, options
            );
    });
        res.status(200).send("Rows has been Ordered!");
        
        // var id = (arrayItem.id != null) ? arrayItem.id : new mongoose.Types.ObjectId(); 
        // const filter = { _id: id };
        // const update = { 
        //     assigned: arrayItem.assigned,
        //     group: arrayItem.group,
        //     field: arrayItem.field,
        //     order: arrayItem.order,
        // };

        // await addModel.countDocuments(filter);

        // await addModel.findOneAndUpdate(filter, update, {
        // new: true,
        // upsert: true // Make this update into an upsert
        // });
        // });
        // res.status(200).send("Rows has been Ordered!");

});

//Delete by ID Method
router.delete('/deleteField/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await addModel.findByIdAndDelete(id)
        res.send(`Additional Field ${data.field} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search Fieldname
router.get("/searchField", async (req,res) => {
    try {
        const allAPI = await addModel.find({ field : { $regex : new RegExp(String(req.query.text), "i") } });
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

// Search Groupname
router.get("/searchGroup", async (req,res) => {
    try {
        const allAPI = await addModel.find({ group : { $regex : new RegExp(String(req.query.text), "i") } });
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

// Search Fieldname
router.get("/searchAssigned", async (req,res) => {
    try {
        const allAPI = await addModel.find({ assigned : { $regex : new RegExp(String(req.query.text), "i") } });
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
