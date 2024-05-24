import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Announ from "./components/Announ"
import Login from './components/Login';
import Home from './components/Home';
import Food from './components/Food';
import Lesson from './components/Lesson';
import Events from './components/Events';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/announ" element={<Announ/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/food' element={<Food/>} />
        <Route path='/lesson' element={<Lesson/>} />
      </Routes>
    </Router>
  );
}

export default App;
