import { Food as FoodModel } from "../models/food";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

interface FoodProps {
  food: FoodModel;
  index: number;
  onDeleteFoodClicked: (food: FoodModel) => void;
  onFoodClicked: (food: FoodModel) => void;
}

const FoodAdmin = ({
  food,
  index,
  onDeleteFoodClicked,
  onFoodClicked,
}: FoodProps) => {
  let createdUpdatedText: JSX.Element;

  if (food.updatedAt > food.createdAt) {
    createdUpdatedText = (
      <>
        Updated: <br />
        {formatDate(food.updatedAt)}
      </>
    );
  } else {
    createdUpdatedText = (
      <>
        Created: <br />
        {formatDate(food.updatedAt)}
      </>
    );
  }

  return (
    <div
      key={index}
      className="bg-gray-800 shadow-lg rounded-lg p-4 cursor-pointer"
     
    >
      <div
        className={` p-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105 bg-green-500`}
      >
        <div className="flex justify-between items-center">
          <p className="font-bold text-black text-lg text-left">{food.foodName}</p>
          <MdEditSquare   onClick={() => onFoodClicked(food)} className="text-white text-2xl"/>
        </div>
        <div className="flex justify-end mt-2">
          <div className="text-2xl cursor-pointer text-white text-right">
            <MdDelete
              onClick={(e) => {
                onDeleteFoodClicked(food);
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAdmin;
