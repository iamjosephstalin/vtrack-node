require('dotenv').config();
const rolesRoutes = require('./routes/roles.route');
const currencyRoutes = require('./routes/currencies.route');
const vatRoutes = require('./routes/vat.route');
const apiRoutes = require('./routes/API.route');
const unitRoutes = require('./routes/units.route');
const tagRoutes = require('./routes/tags.route');
const addRoutes = require('./routes/additional.route');
const machineRoutes = require('./routes/machines.route');
const clientRoutes = require('./routes/clients.route');

var cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', rolesRoutes,currencyRoutes,vatRoutes,unitRoutes,tagRoutes,apiRoutes,addRoutes,machineRoutes,clientRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
})