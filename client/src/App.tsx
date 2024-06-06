import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Announ from "./components/adminComponents/Announ"
import Login from './components/userComponents/Login';
import Food from "./components/Food";
import Lesson from './components/adminComponents/Lesson';
import Events from './components/adminComponents/Events';
import Admin from './components/adminComponents/Admin';
import Homes from "./components/adminComponents/Homes"
import LessonUser from "./components/userComponents/Lesson"
import AnnounUser from "./components/userComponents/AnnounUser"
import EventUser from "./components/userComponents/EventUser"
import Home from './components/userComponents/Home';
import FoodUser from "./components/FoodUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/announ" element={<Announ/>} />
        <Route path='/event' element={<Events/>} />
        <Route path='/food' element={<Food/>} />
        <Route path='/lesson' element={<Lesson/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/homes' element={<Homes />} /> 
        <Route path='/lessonUser' element={<LessonUser />} />
        <Route path='/announUser' element={<AnnounUser />} />
        <Route path='/eventUser' element={<EventUser />} />
        <Route path='/foodUser' element={<FoodUser />} />
      </Routes>
    </Router>
  );
}

export default App;
