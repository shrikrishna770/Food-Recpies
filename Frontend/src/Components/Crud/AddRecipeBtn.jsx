import { Link } from "react-router-dom";

const RecipeBtn = ({name}) => {
  return (
    <div className="flex justify-between max-w-[1400px] w-full mx-auto items-center mt-[100px] mb-[30px] px-4">
      <h1 className="font-[500] text-[22px]">{name}</h1>
      <div>
        <Link to="/add-item">
          <button className="border px-[20px] rounded-[12px] flex items-center gap-[10px] bg-green-600 text-white hover:bg-green-700">
            <span className="text-[28px]">+</span> Add Recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeBtn;
