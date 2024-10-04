import React, { useState, useEffect } from "react";
import { useMainStore } from "../store/store";
import merp from "../images/merpLogo1.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import breakfast from "../images/breakfast.jpg";
import tatlı from "../images/tatlı.jpg";
import breakfast2 from "../images/breakfast2.jpg";
import coffee from "../images/coffe.jpg";
import tea from "../images/tea.jpg";
import food from "../json/food.json"
import { Food as FoodModel } from '../models/food';
import * as FoodsApi from "../network/notes_api";
import FoodKullanici from "./FoodKullanici";

function FoodUser() {
  const userValues = useMainStore((state) => state.userValues);
  const [menuOpen, setMenuOpen] = useState(false);
  const foodMenu = food.menu;
  const [foods, setFoods] = useState<FoodModel[]>([]);


  useEffect(() => {
    const loadFoods = async () => {
        try {
          const foods = await FoodsApi.fetchFood();
          setFoods(foods);
        } catch (error) {
          console.error(error);
          alert(error);
        }
    }

    loadFoods();
  }, []);



  function groupFoodsByDay(foods : any) {
    return foods.reduce((acc: any, food: any) => {
      if (!acc[food.day]) {
        acc[food.day] = [];
      }
      acc[food.day].push(food);
      return acc;
    }, {});
  }

const groupedFoods = groupFoodsByDay(foods);

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={merp}
                alt="merp"
                className="align-middle"
                style={{ height: "150px" }}
              />
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4 border p-4 bg-gray-750 text-sm rounded-full">
                <li>
                  <Link to="/home" className="text-black hover:font-medium">
                    Ana Ekran
                  </Link>
                </li>
                <li>
                  <Link to="/announUser" className="text-black hover:font-medium">
                    Duyurular
                  </Link>
                </li>
                <li>
                  <Link to="/eventUser" className="text-black hover:font-medium">
                    Etkinlik
                  </Link>
                </li>
                <li>
                  <Link to="/lessonUser" className="text-black hover:font-medium">
                    Dersler
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

      <div className="grid xl:grid-cols-5 gap-x-4 gap-y-2 cursor-pointer">
        <div className="group relative transform transition-transform duration-300 hover:scale-110 hover:z-10">
          <img
            src={tea}
            className="h-[250px] w-full rounded-lg transition-transform duration-300 group-hover:rotate-2 group-hover:shadow-lg"
            alt={tea}
          />
        </div>
        <div className="group relative transform transition-transform duration-300 hover:scale-110 hover:z-10">
          <img
            src={tatlı}
            className="h-[250px] w-full rounded-lg transition-transform duration-300 group-hover:rotate-2 group-hover:shadow-lg"
            alt={tatlı}
          />
        </div>
        <div className="group relative transform transition-transform duration-300 hover:scale-110 hover:z-10">
          <img
            src={breakfast2}
            className="h-[250px] w-full rounded-lg transition-transform duration-300 group-hover:rotate-2 group-hover:shadow-lg"
            alt={breakfast2}
          />
        </div>
        <div className="group relative transform transition-transform duration-300 hover:scale-110 hover:z-10">
          <img
            src={coffee}
            className="h-[250px] w-full rounded-lg transition-transform duration-300 group-hover:rotate-2 group-hover:shadow-lg"
            alt={coffee}
          />
        </div>
        <div className="group relative transform transition-transform duration-300 hover:scale-110 hover:z-10">
          <img
            src={breakfast}
            className="h-[250px] w-full rounded-lg transition-transform duration-300 group-hover:rotate-2 group-hover:shadow-lg"
            alt={breakfast}
          />
        </div>
      </div>

      <div className="bg-gray-800 px-2 py-2 mt-2 rounded">
        <h1 className="text-white font-semibold text-3xl text-center">YEMEK MENÜSÜ</h1>   
      </div>
      <div className="grid xl:grid-cols-5 gap-x-4 gap-y-2 mx-4 mt-2">
        {foodMenu.map((day) => (
          <div key={day.day}  className="bg-gray-900 shadow-lg rounded-lg p-4 cursor-pointer  border-gray-800 border-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-white">
                {day.day}
            </h2>
            {day.items.map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105 bg-gray-800`}
                >
                  <p className="text-white text-base">{item}</p>
                </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-gray-500 px-2 py-2 mt-2 rounded">
        <h1 className="text-white font-semibold text-3xl text-center">YENİ EKLENMİŞ MENÜLER</h1>   
      </div>
      <div className="grid xl:grid-cols-5 gap-x-4 gap-y-2 mx-4 mt-2">
        {Object.keys(groupedFoods).map(day => (
            <div key={day} className="bg-gray-500 shadow-lg rounded-lg p-4 border-8 border-gray-400">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {day}
              </h2>
              {groupedFoods[day].map((food: any, i: any) => (
                <FoodKullanici
                  key={food._id} 
                  food={food} 
                  index={i} 
                  onDeleteFoodClicked={() => {}} 
                  onFoodClicked={() => {}} 
                />          
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FoodUser;


