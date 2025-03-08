const mongoose = require('mongoose');
require('dotenv').config();

const connecttoDB = async () => {

     try {
        
           await mongoose.connect(process.env.DATABASE_URL)
      //      console.log(process.env.DATABASE_URL)
           console.log("Connected to database")

     } catch (error) {
      // console.log("Connected to database")
      // console.log(process.env.DATABASE_URL)
        console.log(error);
     }
}

module.exports = connecttoDB;