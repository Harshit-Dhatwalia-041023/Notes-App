import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import api from "../lib/axios";
const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  
const navigate =useNavigate();
const handleSubmit=async (event)=>{
event.preventDefault();
   setLoading(true);
   try{
    await api.post("/notes ",{title:title,content:content});
    toast.success("Note Created successfully");
      navigate("/")
   }
   catch(err){
    if(err.response.status ===429){
      toast.error("Slow down !,You are creating notes too fast !",{
        duration:4000,
        icon:"☠️",
      });
    }else{
      toast.error("Failed,to create note");
    }
    
   }
   finally{
    setLoading(false);
   }
 
  }
  return (
    <div className="min-h-screen bg-base-200">
    <div className="container  mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
      <Link to={"/"} className="btn btn-ghost mb-6">
        <ArrowLeftIcon className="size-8 "/> <span>Back to Notes</span>
      </Link>
      <div className="card bg-base-100">
      <div className="card-body">
        <h2 className=" card-title text-3xl font-bold mb-6">Create New Note</h2>
        <form className="form-control mb-4" onSubmit={handleSubmit} >
          <label className="label mb-4">
          <span className="label-text">Title</span>
          </label>
          <input type="text" placeholder="Note Title ... " className="input input-bordered mb-4" value={title} onChange={(event)=>setTitle(event.target.value)}/>
          <label className="label mb-4">
            <span className="label-text">Content</span>
          </label>
          <textarea placeholder="Write your note here ..." className="textarea textarea-bordered " rows={5} value={content} onChange={(event)=>setContent(event.target.value)}></textarea>
        
       <div className="card-actions justify-end mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
         {loading ? "Creating..." : "Create Note"}</button>
       </div>
       </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default CreatePage