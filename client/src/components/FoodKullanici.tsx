import { Food as FoodModel } from "../models/food"
import { formatDate } from '../utils/formatDate';

interface FoodProps {
    food: FoodModel,
    index: number,
    onDeleteFoodClicked: (food: FoodModel) => void,
    onFoodClicked: (food: FoodModel) => void
}

const FoodKullanici = ({ food, index, onDeleteFoodClicked, onFoodClicked } : FoodProps) => {
    let createdUpdatedText: JSX.Element;

    if(food.updatedAt > food.createdAt) {
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
      className="bg-gray-900 shadow-lg rounded-lg p-4 cursor-pointer mb-2"
      onClick={() => onFoodClicked(food)}
      >
      <div
        className={`mb-4 p-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105`}
      >
        <p className="font-bold text-white text-lg">{food.foodName}</p>
        <div className='flex justify-between flex-1'>
        {/* <div className='text-xl cursor-pointer text-white'>
          <MdDelete onClick={(e) => {
            onDeleteFoodClicked(food);
            e.stopPropagation();
          }} />
        </div> */}
      </div>
      </div>
      
    </div>
  )
}

export default FoodKullanici

