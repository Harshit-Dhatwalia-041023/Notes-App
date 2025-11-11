import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import RateLimited from "../components/RateLimited"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NoNoteYet from "../components/NoNoteYet";
const HomePage = () => {
  const [isRateLimited,setRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchNotes = async()=>{
      try{
        const res = await api.get("/notes")
        // console.log(res.data)
        setNotes(res.data);
      }
      catch(err){
        console.log("Error while fetching the data",err)
        if(err.response?.status ===429){
          setRateLimited(true);
        }else{
          toast.error("Failed to load notes")
        }
      }finally{
        setLoading(false);
      }
    }
    fetchNotes()
  },[])
  return (
    <div className="min-h-screen">
      < Navbar/>
      {
        isRateLimited && <RateLimited />
      }
      <div className="mx-auto max-w-6xl px-4 mt-6 ">
        { loading &&  <div className="text-center text-primary py-10">loading notes...</div>}
        {notes.length ===  0 && !isRateLimited && <NoNoteYet/>}
        {notes.length >0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note)=>(
               <NoteCard key={note._id} data={note} setnotes={setNotes} />
            ))}
          </div>
        )}
        </div>
    </div>
  )
}

export default HomePage; 