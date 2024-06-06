import React, { useState, useEffect } from "react";
import merp from "../images/merpLogo1.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import breakfast from "../images/breakfast.jpg";
import tatlı from "../images/tatlı.jpg";
import breakfast2 from "../images/breakfast2.jpg";
import coffee from "../images/coffe.jpg";
import tea from "../images/tea.jpg";
import { Food as FoodModel } from "../models/food";
import * as FoodsApi from "../network/notes_api";
import AddEditFoodDialog from "./AddEditFoodDialog";
import FoodAdmin from "./FoodAdmin";

function Food() {
  const [foods, setFoods] = useState<FoodModel[]>([]);
  const [showAddFoodDialog, setShowAddFoodDialog] = useState(false);
  const [foodToEdit, setFoodToEdit] = useState<FoodModel | null>(null);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const foods = await FoodsApi.fetchFood();
        setFoods(foods);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    loadFoods();
  }, []);

  async function deleteFood(food: FoodModel) {
    try {
      await FoodsApi.deleteFood(food._id);
      setFoods(foods.filter((existingNote) => existingNote._id !== food._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  function groupFoodsByDay(foods: any) {
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
      <nav className="bg-white  shadow-lg sticky top-0 z-50">
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
              <ul className="flex space-x-4 border p-4 bg-gray-750 text-lg rounded-full">
                <li>Merp Admin Panel</li>
              </ul>
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

      <div className="bg-gray-900 min-h-screen p-6 text-center text-white">
        <button
          onClick={() => setShowAddFoodDialog(true)}
          className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md text-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200 text-lg"
        >
          Yemek Menüsü Ekle
        </button>

        {showAddFoodDialog && (
          <AddEditFoodDialog
            onDismiss={() => setShowAddFoodDialog(false)}
            onFoodSaved={(newFood) => {
              setFoods([newFood, ...foods]);
              setShowAddFoodDialog(false);
            }}
          />
        )}
        {foodToEdit && (
          <AddEditFoodDialog
            foodToEdit={foodToEdit}
            onDismiss={() => setFoodToEdit(null)}
            onFoodSaved={(updatedFood) => {
              setFoods(
                foods.map((existingNote) =>
                  existingNote._id === updatedFood._id
                    ? updatedFood
                    : existingNote
                )
              );
              setFoodToEdit(null);
            }}
          />
        )}

        <h1 className="text-3xl my-5 text-white underline text-center">
          Yeni Eklenmiş Yemek Menüleri
        </h1>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-5 gap-6">
          {Object.keys(groupedFoods).map((day) => (
            <div key={day} className="bg-gray-800 shadow-lg rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">{day}</h2>
              {groupedFoods[day].map((food: any, i: any) => (
                <FoodAdmin
                  key={food._id}
                  food={food}
                  index={i}
                  onDeleteFoodClicked={deleteFood}
                  onFoodClicked={setFoodToEdit}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Food;
