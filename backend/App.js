const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/EmployeeRoute');
const cors = require('cors');
const cp = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cp());
dotenv.config({path:'./config/Config.env'});
require('./db/Conn');
app.use('/EMS', router);

module.exports = app;