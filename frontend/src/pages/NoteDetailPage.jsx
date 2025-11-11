import { ArrowLeftIcon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import {Link, useParams} from "react-router"
import toast from "react-hot-toast"
import api from "../lib/axios"
import { useNavigate } from "react-router"
const NoteDetailPage = () => {
  const [note,setnote] = useState(null);
  let [loading,setLoading] = useState(false);
  const navigate =useNavigate();
  const {id} = useParams()
  useEffect(()=>{
    const fetchdata = async ()=>{
      try{
      let res = await api.get(`/notes/${id}`);
      console.log(res);
      // console.log(res[0].title);
      setnote(res.data);
      }
      catch(err){
        toast.error("Failed to fetch the note !")
      }
       };
    fetchdata();
  },[id])
  // // console.log(note)
  const handleDelete = async(event)=>{
    event.preventDefault()
    if(!window.confirm("Are you sure want to delete this note")) return;
    try{
      const deleteNote = await api.delete(`/notes/${id}`);
      toast.success("Successfully deleted the note");
      navigate("/");
    }
    catch(err){
      toast.error("Error, in deleting the data !");
    }
  };

  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please, Add a title and content !");
      return;
    }
     if(!window.confirm("Are you sure want to edit this note ?")) return;
    try{
       setLoading(true)
    await api.put(`/notes/${id}`,{title:note.title,content:note.content});
     toast.success("Successfully updating")
    ;
      navigate("/");
    }
    catch(err){
      console.log("Error during updation");
      if(err.response?.status ===429){
        toast.error("Slow down ,You are sending to must request !",{
          duration:4000,
          icon:"⚠️"
        })
      }
      else{
        toast.error("Error during updation")
      }
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      {!note ? (
        <div className="text-center mt-10">Loading...</div>
      ):(
      <div className=" container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto flex items-center justify-between mb-6 ">
        <Link to={"/"} className="flex items-center gap-4 btn btn-ghost" >
        <ArrowLeftIcon className="size-8" /> <span>Back to notes</span>
        </Link>
        <button onClick={handleDelete} className="btn btn-error btn-outline">
          <Trash2Icon className="size-5"/>
          Delete Note
        </button>
      </div>
      <div className="card max-w-2xl mx-auto ">
        <div className="card-body">
          <form className="form-control" onSubmit={handleSubmit}>
            <label className="label">
              <p className="label-text">Title</p>
            </label>
            <input type="text" 
             className="input input-bordered mt-6"
              value={note.title}
              onChange={(e)=>setnote({...note, title: e.target.value})}
              />
            <label className="label">
              <p className="label-text mt-6">Content</p>
            </label>
            <textarea type="text"
            rows={5}
            className="textarea textarea-bordered mt-4" 
            value={note.content}
            onChange={(e)=>setnote({...note, content:e.target.value})}
            />
            <div className="card-action mt-6 flex justify-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {!loading ? "Update Note" : "Updating ..."}
              </button>
            </div>
          </form> 
        </div>
      </div>
    </div>
      )}
    </div>
  )
}

export default NoteDetailPage