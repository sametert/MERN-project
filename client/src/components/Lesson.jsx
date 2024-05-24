import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useMainStore } from "../store/store";
import lessons from "../json/örnek.json";
import merpLogo from "../images/merpLogo1.png";
import React, { useState } from "react";


function Lesson() {
  const userValues = useMainStore((state) => state.userValues);
  const department = userValues.department;
  const schedule =
    lessons[`${userValues.department}`][`${userValues.classYear}`][2];
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div>
      <nav className="bg-white p-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={merpLogo}
                alt=""
                className="align-middle"
                style={{ height: "100px" }}
              />
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4 border p-4 bg-gray-750 text-sm rounded-full">
              <li>
                  <Link to="/" className="text-black hover:font-medium">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/home" className="text-black hover:font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/announ" className="text-black hover:font-medium">
                    Announs
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-black hover:font-medium">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/food" className="text-black hover:font-medium">
                    Food
                  </Link>
                </li>
              </ul>
            </div>
            <div className="relative">
            <div
                className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <p className="text-lg font-semibold">{userValues.name} {userValues.secondname.toUpperCase()}</p>
                <p className="text-sm">{userValues.department} Bölümü</p>
                <p className="text-sm">{userValues.classYear}. Sınıf</p>
              </div>
              {menuOpen && (
                <div className="absolute bg-white rounded-md shadow-md mt-2 w-40">
                  <div className="py-2">
                    <Link
                      // onClick={handleLogout}
                      to="/"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                    >
                      Çıkış Yap
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {department} Ders Programı
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {schedule.map((day) => (
            <div
              key={day.day}
              className="bg-gray-800 shadow-lg rounded-lg p-4 cursor-pointer"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {day.day}
              </h2>
              {day.courses.map((course, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105    ${course.color}`}
                >
                  <p className="text-black text-sm">{course.time}</p>
                  <p className="font-bold text-black text-lg">{course.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lesson;
