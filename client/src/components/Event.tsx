import styles from '../styles/Note.module.css';
import { Card, CardBody, CardFooter, CardText, CardTitle } from "react-bootstrap"
import { Note as NoteModel } from "../models/note"
import { formatDate } from '../utils/formatDate';

interface NoteProps {
    note: NoteModel,
    className?: string,
    index: number
}

const Note = ({ note, className, index} : NoteProps) => {
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

    const isEven = index % 2 === 0;


  return (
    <div
    key={index}
    className={`p-6 rounded-lg shadow-md flex gap-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${
      isEven ? "bg-purple-100" : "bg-green-100"
    }`}
  >
    <div
      className={`flex-shrink-0 ${
        isEven ? "text-purple-600" : "text-green-600"
      }`}
    >
      <div className="text-sm">{createdUpdatedText}</div>
      <h2 className="text-2xl font-semibold">{note.title}</h2>
    </div>
    <div
      className={`w-0.5 ${
        isEven ? "bg-purple-600" : "bg-green-600"
      }`}
    ></div>
    <div className="flex-grow">
      <p className="text-gray-700">{note.text}</p>
    </div>
  </div>
   

  )
}

export default Note