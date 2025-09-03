import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { MdArrowBack } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const ViewItem = () => {
  const location = useLocation();
  const params = useParams();
  const [recipe, setRecipe] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    if (!recipe && params.id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/recipes/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRecipe(data);

          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [recipe, params.id]);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (!recipe) return <h1 className="text-center mt-10">No recipe found</h1>;

  const { image, title, tags = [], description, prepTime, cookTime, servings, ingredients = [], instruction: instructions = [] } = recipe;


  return (
    <div>
      <Navbar />

      <div className="mt-[100px] max-w-[1000px] w-full mx-auto ">
        <div className="flex items-center py-[10px] px-[10px]">
          <Link to="/dashboard" className="flex items-center gap-1 text-[#16A34A] font-[500]" >
            <MdArrowBack size={24} />
            <span>Back to My Recipes</span>
          </Link>
        </div>

        <div className="mt-[15px] mx-[40px] mb-[20px] shadow-xl rounded-xl pb-[30px]">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-[350px] object-cover rounded-t-xl"
            />
          )}
          <div className=" px-[25px] pt-[10px] ">
            <h1 className="font-[500] text-[30px] mt-[4px]">{title}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, i) => (
                <span key={i} className="px-4 py-[5px] text-sm bg-green-100 text-green-700 rounded-[5px]">{tag}</span>
              ))}
            </div>

            <p className="text-gray-700 mt-5">{description}</p>
            <div className="flex py-[10px] gap-[30px] mt-[16px] ">
              <div className="flex gap-[8px] items-center ">
                <FiClock size={20} color="gray" strokeWidth={3} />
                <div>
                  <h1 className="text-gray-700 text-sm">Prep Time</h1>
                  <span className="font-[500]">{prepTime}</span>
                </div>
              </div>
              <div className="flex gap-[8px] items-center ">
                <FiClock size={20} color="gray" strokeWidth={3} />
                <div>
                  <h1 className="text-gray-700 text-sm">Cook Time</h1>
                  <span className="font-[500]">{cookTime}</span>
                </div>
              </div>
              <div className="flex gap-[8px] items-center ">
                <GoPeople size={20} color="gray" strokeWidth={1} />
                <div>
                  <h1 className="text-gray-700 text-sm">Servings</h1>
                  <span className="font-[500]">{servings}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-[500] mb-4">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 border-red-500 space-y-2 px-[8px]">
                {ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              {instructions.length > 0 ? (
                <ol className="list-decimal list-inside text-gray-700 space-y-2 px-[8px]">
                  {instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">No instructions provided.</p>
              )}
            </div>
            <hr className="mt-[40px] border-gray-400" />
            <div className="mt-[25px] flex justify-between">
              <button className="border border-gray-400 px-[25px] py-[10px] rounded-[8px] cursor-pointer flex items-center gap-[10px]">
                <FiEdit size={20} />
                <span className="text-gray-800">Edit Recipe</span>
              </button>
              <button className="border px-[30px] py-[10px] rounded-[8px] cursor-pointer flex items-center gap-[10px] bg-red-600 text-white hover:bg-red-700">
                <AiOutlineDelete size={20} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
