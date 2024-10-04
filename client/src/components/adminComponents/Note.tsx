import { Note as NoteModel } from "../../models/note";
import { formatDate } from "../../utils/formatDate";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  className?: string;
  index: number;
  onDeleteNoteClicked: (note: NoteModel) => void;
  onNoteClicked: (note: NoteModel) => void;
}

const Note = ({
  note,
  index,
  onDeleteNoteClicked,
  onNoteClicked,
}: NoteProps) => {
  let createdUpdatedText: JSX.Element;

  if (note.updatedAt > note.createdAt) {
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

  return (
    <div
      key={index}
      className={`p-6 rounded-lg shadow-md flex gap-4 hover:shadow-lg transition-shadow ${
        index % 2 === 0 ? "bg-blue-100" : "bg-yellow-100"
      }`}
    >
      <div
        className={`w-32 flex-shrink-0 ${
          index % 2 === 0 ? "text-blue-600" : "text-yellow-600"
        }`}
        style={{ fontSize: "12px" }}
      >
        {createdUpdatedText}
      </div>
      <div
        className={`w-0.5 ${index % 2 === 0 ? "bg-blue-600" : "bg-yellow-600"}`}
      ></div>
      <div className="flex justify-between flex-1">
        <div>
          <h2 className="text-xl font-semibold cursor-pointer hover:underline">
            {note.title}
          </h2>
          <p className="mt-2 text-gray-700">{note.text}</p>
        </div>
        <div className="text-xl cursor-pointer flex flex-col justify-between">
          <MdDelete
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
          <MdEditSquare onClick={() => onNoteClicked(note)} />
        </div>
      </div>
    </div>
  );
};

export default Note;
