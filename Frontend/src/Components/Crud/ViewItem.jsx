import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
import { FiEdit, FiClock } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import Navbar from "../Navbar/Navbar";

const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ added location to trigger refetch
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setRecipe(data);
    } catch (err) {
      console.error("Failed to fetch recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CHANGED: added location.state in dependency array to refetch after edit
  useEffect(() => {
    fetchRecipe();
  }, [id, location.state]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipe) return <p className="text-center mt-10">Recipe not found</p>;

  const recipeOwnerId = recipe?.user?._id || recipe?.user;
  const isOwner = recipeOwnerId === currentUserId;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${recipe._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("Recipe deleted successfully!");
      navigate("/my-recipes");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const { image, title, tags = [], description, prepTime, cookTime, servings, ingredients = [], instruction: instructions = [] } = recipe;

  return (
    <>
      <Navbar />
      <div className="mt-[90px] max-w-[900px] w-full mx-auto">
        <div className="flex items-center py-[10px] px-[10px]">
          <Link to="/my-recipes" className="flex items-center gap-1 text-[#16A34A] font-[500]">
            <MdArrowBack size={24} />
            <span>Back to My Recipes</span>
          </Link>
        </div>

        <div className="mt-[15px] mx-[40px] mb-[20px] shadow-xl rounded-xl pb-[30px]">
          {image && <img src={image} alt={title} className="w-full h-80 object-cover rounded-t-xl" />}

          <div className="px-[25px] pt-[10px]">
            <h1 className="font-[500] text-[30px] mt-[4px]">{title}</h1>

            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, i) => <span key={i} className="px-4 py-[5px] text-sm bg-green-100 text-green-700 rounded-[5px]">{tag}</span>)}
            </div>

            <p className="text-gray-700 mt-5">{description}</p>

            <div className="flex py-[10px] gap-[30px] mt-[16px]">
              <div className="flex gap-[8px] items-center">
                <FiClock size={20} color="gray" strokeWidth={3} />
                <div>
                  <h1 className="text-gray-700 text-sm">Prep Time</h1>
                  <span className="font-[500]">{prepTime}</span>
                </div>
              </div>

              <div className="flex gap-[8px] items-center">
                <FiClock size={20} color="gray" strokeWidth={3} />
                <div>
                  <h1 className="text-gray-700 text-sm">Cook Time</h1>
                  <span className="font-[500]">{cookTime}</span>
                </div>
              </div>

              <div className="flex gap-[8px] items-center">
                <GoPeople size={20} color="gray" strokeWidth={1} />
                <div>
                  <h1 className="text-gray-700 text-sm">Servings</h1>
                  <span className="font-[500]">{servings}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-[500] mb-4">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 px-[8px]">
                {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              {instructions.length > 0 ? (
                <ol className="list-decimal list-inside text-gray-700 space-y-2 px-[8px]">
                  {instructions.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              ) : <p className="text-gray-500">No instructions provided.</p>}
            </div>

            {isOwner && (
              <>
                <hr className="my-6 border-gray-300" />
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                    className="border border-gray-400 px-6 py-2 rounded-xl cursor-pointer flex items-center gap-2 hover:bg-gray-100"
                  >
                    <FiEdit size={20} />
                    <span>Edit Recipe</span>
                  </button>

                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 rounded-xl cursor-pointer flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
                  >
                    <AiOutlineDelete size={20} />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItem;
