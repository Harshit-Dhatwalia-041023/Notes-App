const Note = require("../models/notes");
const mongoose = require("mongoose")
module.exports.getNotes = async(req,res)=>{
    let data =await Note.find({}).sort({createdAt:-1});
    // console.log(data);
    res.status(200).json(data);
}
module.exports.getNote = async(req,res)=>{
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mssg: "Invalid ID format!" });
  }
    let data = await Note.findById(id);
    if(!data){
       return res.status(404).json({mssg:"Note doesn't exist !"})
    }
    // console.log(data);
    res.status(200).json(data)
}
module.exports.create = async(req,res)=>{
    let ans =  new Note(req.body);
    await ans.save();
    // console.log(ans);
    res.status(201).json({mssg:"Successfully created a note !"});
}
module.exports.update = async (req,res)=>{
    let {id} = await req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mssg: "Invalid ID format!" });
  }
    let data = req.body;
    let ans = await Note.findByIdAndUpdate(id,data,{new:true});
    if (!ans){
        return res.status(404).json({mssg:"Note doesn't exist !"})
     } 
    // console.log(ans);
    res.status(200).json(ans);
}
module.exports.delete = async (req,res)=>{
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mssg: "Invalid ID format!" });
  }
    let deleteNote = await Note.findByIdAndDelete(id);
    if(!deleteNote){
       return res.status(404).json({mssg:"Note doesn't exist !"})
    }
    res.status(200).json({mssg:"Successfully deleted a note !"});
}