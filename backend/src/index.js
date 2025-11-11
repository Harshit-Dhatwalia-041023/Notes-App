if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}
const express = require("express");
const app = express();
const port = process.env.PORT||3000
const router = require("./routes/notesRoutes");
const dbconnect = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((cors()));
app.use(rateLimiter);

app.use("/api/notes",router);

app.use((err,req,res,next)=>{
    res.status(400).json({mssg:"Error during request"})
})
dbconnect().then(()=>{
    app.listen(port,(req,res)=>{
    console.log(`Server is listening to http://localhost:${process.env.PORT}`);
})
})
