if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const port = process.env.PORT||3000;

const router = require("./routes/notesRoutes");
const dbconnect = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");


app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(process.env.NODE_ENV !== "production"){
    app.use((cors()));
}

app.use(rateLimiter);

app.use("/api/notes",router);

if (process.env.NODE_ENV === "production") {
    const fronendPath = path.join(__dirname,"../../frontend/dist");
    console.log(fronendPath);
  app.use(express.static(fronendPath));

  app.use( (req, res) => {
  res.sendFile(path.join(fronendPath,"index.html"));
});
}

app.use((err,req,res,next)=>{
    res.status(400).json({mssg:"Error during request"})
})
dbconnect().then(()=>{
    app.listen(port,(req,res)=>{
    console.log(`Server is listening to http://localhost:${process.env.PORT}`);
})
})
