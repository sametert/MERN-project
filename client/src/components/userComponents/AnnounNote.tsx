import styles from '../styles/Note.module.css';
import { Card, CardBody, CardFooter, CardText, CardTitle } from "react-bootstrap"
import { Note as NoteModel } from "../../models/note"
import { formatDate } from '../../utils/formatDate';
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    className?: string,
    index: number,
    onDeleteNoteClicked: (note: NoteModel) => void,
    onNoteClicked: (note: NoteModel) => void
}

const Note = ({ note, className, index, onDeleteNoteClicked, onNoteClicked } : NoteProps) => {
  let createdUpdatedText: JSX.Element;

    if(note.updatedAt > note.createdAt) {
      createdUpdatedText = (
        <>
          Updated: <br />
          {formatDate(note.updatedAt)}
        </>
      );
    } else {
      createdUpdatedText = (
        <>
          Created: <br />
          {formatDate(note.updatedAt)}
        </>
      );
    }

    console.log(formatDate(note.createdAt));


  return (
    <div 
      key={index} 
      className={`p-6 rounded-lg shadow-md flex gap-4 hover:shadow-lg transition-shadow ${index % 2 === 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}
      onClick={() => onNoteClicked(note)}
      >
      <div className={`w-32 flex-shrink-0 ${index % 2 === 0 ? 'text-blue-600' : 'text-yellow-600'}`} style={{fontSize:"12px"}}>{createdUpdatedText}</div>
      <div className={`w-0.5 ${index % 2 === 0 ? 'bg-blue-600' : 'bg-yellow-600'}`}></div>
      <div className='flex justify-between flex-1'>
        <div>
          <h2 className="text-xl font-semibold cursor-pointer hover:underline">{note.title}</h2>
          <p className="mt-2 text-gray-700">{note.text}</p>
        </div>
        {/* <div className='text-xl cursor-pointer'>
          <MdDelete onClick={(e) => {
            onDeleteNoteClicked(note);
            e.stopPropagation();
          }} />
        </div> */}
      </div>
      

    </div>
  )
}

export default Note