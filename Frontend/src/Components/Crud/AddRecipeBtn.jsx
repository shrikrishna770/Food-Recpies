import { Link } from "react-router-dom";

const RecipeBtn = ({ name }) => {
  return (
    <div className="flex justify-between w-full max-w-[1400px] mx-auto items-center mt-16 md:mt-24 mb-8 px-4">
      <h1 className="font-medium text-xl sm:text-2xl">{name}</h1>
      <div>
        <Link to="/add-item">
          <button className="border px-3 py-1.5 rounded-xl flex items-center gap-1 bg-green-600 text-white hover:bg-green-700 transition-colors sm:px-4 sm:py-2 sm:gap-2">
            <span className="text-2xl sm:text-3xl">+</span> 
            <span className="text-sm sm:text-base">Add Recipe</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeBtn;
