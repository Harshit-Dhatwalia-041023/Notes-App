const mongoose = require("mongoose");
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    }
    catch(err){
        console.log("Error during connection to database",err);
        process.exit(1);//exit with failure
    } 
}

module.exports = connectDb;