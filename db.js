const mongoose = require('mongoose');

const connecttoDB = async () => {

     try {
        
           await mongoose.connect(process.env.DATABASE_URL)
           console.log("Connected to database")

     } catch (error) {
        console.log(error);
     }
}

module.exports = connecttoDB;