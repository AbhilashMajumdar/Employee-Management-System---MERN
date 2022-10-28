const mongoose = require('mongoose');
const DB = process.env.DB_URI;
const DB_PORT = 27017;

mongoose.connect(DB)
    .then(()=>{
        console.log(`MongoDB is running on port no : ${DB_PORT}`);
    })
    .catch((err)=>{
        console.log('Error while connecting with mongoDB : ', err);
    })