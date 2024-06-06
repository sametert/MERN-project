import lessonsA from "../../json/örnek.json";
import merpLogo from "../../images/merpLogo1.png";
import React, { useState, useEffect } from "react";
import { Lesson as LessonModel } from "../../models/lesson";
import * as LessonsApi from "../../network/notes_api";
import AddEditLessonDialog from "../lessons/AddEditLessonDialog";
import DersAdmin from "./DersAdmin";

function Lesson() {
  const [lessons, setLessons] = useState<LessonModel[]>([]);
  const [showAddLessonDialog, setShowAddLessonDialog] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState<LessonModel | null>(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const lessons = await LessonsApi.fetchLesson();
        setLessons(lessons);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    loadLessons();
  }, []);

  async function deleteLesson(lesson: LessonModel) {
    try {
      await LessonsApi.deleteLesson(lesson._id);
      setLessons(
        lessons.filter((existingNote) => existingNote._id !== lesson._id)
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  function groupLessonsByDay(lessons: any) {
    return lessons.reduce((acc: any, lesson: any) => {
      if (!acc[lesson.day]) {
        acc[lesson.day] = [];
      }
      acc[lesson.day].push(lesson);
      return acc;
    }, {});
  }

  const groupedLessons = groupLessonsByDay(lessons);

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={merpLogo}
                alt="merpLogo"
                className="align-middle"
                style={{ height: "150px" }}
              />
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4 border p-4 bg-gray-750 text-lg rounded-full">
                <li>Merp Admin Panel</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-900 text-white p-6 text-center">
        <button
          onClick={() => setShowAddLessonDialog(true)}
          className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md text-lg hover:bg-gray-300 hover:shadow-lg transition-all duration-200"
        >
          Ders Ekle
        </button>

        {showAddLessonDialog && (
          <AddEditLessonDialog
            onDismiss={() => setShowAddLessonDialog(false)}
            onLessonSaved={(newNote) => {
              setLessons([newNote, ...lessons]);
              setShowAddLessonDialog(false);
            }}
          />
        )}
        {lessonToEdit && (
          <AddEditLessonDialog
            lessonToEdit={lessonToEdit}
            onDismiss={() => setLessonToEdit(null)}
            onLessonSaved={(updatedLesson) => {
              setLessons(
                lessons.map((existingNote) =>
                  existingNote._id === updatedLesson._id
                    ? updatedLesson
                    : existingNote
                )
              );
              setLessonToEdit(null);
            }}
          />
        )}
        <h1 className="text-3xl my-5 text-white underline text-center">
          Yeni Eklenmiş Dersler
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {Object.keys(groupedLessons).map((day) => (
            <div key={day} className="bg-gray-800 shadow-lg rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">{day}</h2>
              {groupedLessons[day].map((lesson: any, i: any) => (
                <DersAdmin
                  key={lesson._id}
                  lesson={lesson}
                  index={i}
                  onDeleteLessonClicked={deleteLesson}
                  onLessonClicked={setLessonToEdit}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lesson;
