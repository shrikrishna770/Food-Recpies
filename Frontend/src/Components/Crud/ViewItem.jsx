import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { FiEdit, FiClock } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://food-recpies.onrender.com/api/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setRecipe(data);
    } catch (err) {
      console.error("Failed to fetch recipe:", err);
      toast.error("Failed to load recipe details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
    // ✅ Removed `location.state` from the dependency array.
    // The component should only refetch if the `id` changes.
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipe) return <p className="text-center mt-10">Recipe not found</p>;

  // Ensure recipe.user is handled correctly
  const recipeOwnerId = recipe?.user?._id || recipe?.user;
  const isOwner = recipeOwnerId === currentUserId;

  const handleDelete = async () => {
    // Log values before sending the request
    console.log("Recipe ID to be deleted:", recipe._id);
    console.log("Token from localStorage:", localStorage.getItem("token"));

    try {
      const res = await fetch(
        `https://food-recpies.onrender.com/api/recipes/${recipe._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Log the server's response status
      console.log("Server response status:", res.status);

      if (!res.ok) {
        // If the response is not OK, try to read the error message from the body
        const errorData = await res.json();
        console.error("Delete failed with server message:", errorData);
        throw new Error(errorData.error || "Delete failed");
      }

      toast.success("Recipe deleted successfully!");
      navigate("/my-recipes");
    } catch (err) {
      console.error("Caught a client-side error:", err);
      toast.error(err.message || "Failed to delete recipe");
    }
  };

  const {
    image,
    title,
    tags = [],
    description,
    prepTime,
    cookTime,
    servings,
    ingredients = [],
    instruction: instructions = [],
  } = recipe;

  return (
    <>
      <Navbar />
      <div className="mt-20 max-w-4xl w-full mx-auto mb-10 px-4">
        <div className="flex items-center py-2 sm:py-4">
          <Link
            to="/my-recipes"
            className="flex items-center gap-1 text-green-600 font-medium"
          >
            <MdArrowBack size={24} />
            <span>Back to My Recipes</span>
          </Link>
        </div>

        <div className="mt-4 shadow-xl rounded-xl pb-4 sm:pb-6">
          {image && (
            <div className="relative w-full pb-[56.25%]">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
              />
            </div>
          )}

          <div className="p-4 sm:p-6">
            <h1 className="font-medium text-2xl sm:text-3xl mt-2">{title}</h1>

            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-700 mt-5 text-sm sm:text-base">
              {description}
            </p>

            <div className="flex flex-wrap py-2 gap-4 xs:gap-8 mt-4">
              <div className="flex gap-2 items-center">
                <FiClock size={20} color="gray" strokeWidth={3} />
                <div>
                  <h1 className="text-gray-700 text-xs sm:text-sm">
                    Prep Time
                  </h1>
                  <span className="font-medium text-sm sm:text-base">
                    {prepTime}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <FiClock size={20} color="gray" strokeWidth={3} />
                <div>
                  <h1 className="text-gray-700 text-xs sm:text-sm">
                    Cook Time
                  </h1>
                  <span className="font-medium text-sm sm:text-base">
                    {cookTime}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <GoPeople size={20} color="gray" strokeWidth={1} />
                <div>
                  <h1 className="text-gray-700 text-xs sm:text-sm">Servings</h1>
                  <span className="font-medium text-sm sm:text-base">
                    {servings}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-medium mb-4">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 px-2 text-sm">
                {ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              {instructions.length > 0 ? (
                <ol className="list-decimal list-inside text-gray-700 space-y-2 px-2 text-sm">
                  {instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">No instructions provided.</p>
              )}
            </div>

            {isOwner && (
              <>
                <hr className="my-6 border-gray-300" />
                <div className="flex flex-wrap justify-between gap-4">
                  <button
                    onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                    className="border border-gray-400 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    <FiEdit size={20} />
                    <span>Edit Recipe</span>
                  </button>

                  <button
                    onClick={() => setShowConfirm(true)}
                    className="px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <AiOutlineDelete size={20} />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}

            {showConfirm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                  <p className="mb-4">
                    Are you sure you want to delete this recipe?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="border border-gray-300 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItem;
