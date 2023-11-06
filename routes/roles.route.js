const express = require('express');
const roleModel = require('../models/roles.model');

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
router.post('/addRole', async (req, res) => {
    const data = new roleModel({
        name: req.body.name,
        role: req.body.role
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
router.get('/getRoles', paginate(roleModel), async (req, res) => {
    try{
        res.json(res.paginatedResult);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getRole/:id', async (req, res) => {
    try{
        const data = await roleModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateRole/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await roleModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/deleteRole/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await roleModel.findByIdAndDelete(id)
        res.send(`Role ${data.name} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Search Roles
router.get("/searchRole", async (req,res) => {
    try {
        const allRoles = await roleModel.find({ name : { $regex : new RegExp(String(req.query.text), "i") } });
        if(!allRoles || allRoles.length === 0){
            res.status(400).send({error : "No Role was found"});
        }else{
            res.status(200).send(allRoles)
        }  
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }   
})

module.exports = router;
