import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils"
import api from "../lib/axios"
import toast from "react-hot-toast";
const NoteCard = ({data,setnotes}) => {
  const handleDelete =async(event,id)=>{
    event.preventDefault();
    if(!window.confirm("Are you sure want to delete this note ?")) return;

    try{
      await api.delete(`/notes/${id}`);
      setnotes((prev)=>prev.filter(note=>note._id !== id));
      toast.success("Succefully delete the note !");
    }
    catch(err){
      if(err.response.status===429){
        toast.error("Slow down, you are sending request too fast !")
      }
      else{
        toast.error("Error during Deletion !")
      }
    }
  }
  return (
    <Link to={`/note/${data._id}`}
    className="card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
        <div className="card-title text-base-content">{data.title}</div>
        <p className="text-base-content/70 line-clamp-3">{data.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
            {formatDate(new Date(data.createdAt))}
            </span>
        <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4"/>
            <button className="btn btn-ghost btn-xs text-error" onClick={(event)=>handleDelete(event,data._id)}>
                <Trash2Icon className="size-4"/>
            </button>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default NoteCard