import { NotebookIcon } from "lucide-react"
import { Link } from "react-router"
const NoNoteYet = () => {
  return (
        <div className="flex flex-col justify-center items-center max-w-md py-16  space-y-6 mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-4">
            <NotebookIcon className="size-10 text-primary"/>
          </div>
            <div className="flex flex-col text-center ">
                <p className="text-2xl font-bold mb-5">No notes yet</p>
                <p className="mb-8">Ready to organize your thoughts ? Create your first note to get start on your journey.</p>
            </div>
            <Link to={"/create"} className="btn btn-primary">
            Create your first Note
            </Link>
 
    </div>
  )
}

export default NoNoteYet;