import { Lesson as LessonModel } from "../../models/lesson"
import { formatDate } from '../../utils/formatDate';
import { MdDelete } from "react-icons/md";

interface LessonProps {
    lesson: LessonModel,
    index: number,
    onDeleteLessonClicked: (lesson: LessonModel) => void,
    onLessonClicked: (note: LessonModel) => void
}

const Ders = ({ lesson, index, onDeleteLessonClicked, onLessonClicked } : LessonProps) => {
    let createdUpdatedText: JSX.Element;

    if(lesson.updatedAt > lesson.createdAt) {
      createdUpdatedText = (
        <>
          Updated: <br />
          {formatDate(lesson.updatedAt)}
        </>
      );
    } else {
      createdUpdatedText = (
        <>
          Created: <br />
          {formatDate(lesson.updatedAt)}
        </>
      );
    }



  return (
    <div 
      key={index} 
      className="shadow-lg rounded-lg p-4 cursor-pointer mb-2"
      onClick={() => onLessonClicked(lesson)}
      >
      <div
        className={`mb-4 p-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105 bg-green-500`}
      >
        <p className="text-black text-sm">{lesson.hour}</p>
        <p className="font-bold text-black text-lg">{lesson.lessonName}</p>
        <div className='flex justify-between flex-1'>
        {/* <div className='text-xl cursor-pointer text-gray-900'>
          <MdDelete onClick={(e) => {
            onDeleteLessonClicked(lesson);
            e.stopPropagation();
          }} />
        </div> */}
      </div>
      </div>
      
    </div>
  )
}

export default Ders

