import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImageUrl] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [isPublic, setIsPublic] = useState(false);

  const navigate = useNavigate();

  const handleChange = (array, setArray, index, value) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };

  const addField = (array, setArray) => setArray([...array, ""]);

  const removeField = (array, setArray, index) => {
    if (array.length > 1) {
      setArray(array.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      image,
      prepTime,
      cookTime,
      servings,
      calories,
      ingredients,
      instruction: instructions.filter((step) => step.trim() !== ""),
      tags,
      isPublic, // ✅ Include public/private flag
    };

    try {
      const res = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(recipeData),
      });

      if (res.ok) {
        toast.success("Recipe saved successfully 🔥");
        navigate("/dashboard");
      } else {
        const error = await res.json();
        console.error("POST /recipes error:", error); // 🔹 log for debugging
        toast.error("Error: " + (error.error || error.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save recipe ❌");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 max-w-4xl mx-auto mb-10 px-4">
        <div className="flex items-center py-2 sm:py-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-green-600 font-medium"
          >
            <MdArrowBack size={24} />
            <span>Back to My Recipes</span>
          </Link>
        </div>

        <div className="mt-4 p-4 sm:p-6 md:p-8 shadow-lg rounded-lg">
          <h1 className="font-medium text-xl sm:text-2xl mb-4">Add New Recipe</h1>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="flex flex-col mt-4 gap-1">
              <label htmlFor="recipeTitle">Recipe Title</label>
              <input
                type="text"
                id="recipeTitle"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter recipe title"
                className="border border-gray-300 outline-none rounded-lg h-10 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col mt-4 gap-1">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your recipe"
                className="border border-gray-300 outline-none rounded-lg h-20 p-3 text-sm text-gray-700 resize-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>

            {/* Image */}
            <div className="flex flex-col mt-4 gap-1">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="border border-gray-300 outline-none rounded-lg h-10 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>

            {image && (
              <div className="flex flex-col mt-4 gap-1">
                <label>Image Preview</label>
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Prep & Cook Time */}
            <div className="flex flex-col sm:flex-row mt-4 gap-4">
              <div className="flex flex-col w-full sm:w-1/2 gap-1">
                <label>Prep Time</label>
                <input
                  type="text"
                  required
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="e.g. 15 min"
                  className="border border-gray-300 outline-none rounded-lg h-10 px-3 text-sm focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/2 gap-1">
                <label>Cook Time</label>
                <input
                  type="text"
                  required
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="e.g. 30 min"
                  className="border border-gray-300 outline-none rounded-lg h-10 px-3 text-sm focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Servings & Calories */}
            <div className="flex flex-col sm:flex-row mt-4 gap-4">
              <div className="flex flex-col w-full sm:w-1/2 gap-1">
                <label>Servings</label>
                <input
                  type="number"
                  required
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="e.g. 4"
                  className="border border-gray-300 outline-none rounded-lg h-10 px-3 text-sm focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/2 gap-1">
                <label>Calories (per serving)</label>
                <input
                  type="text"
                  required
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="e.g. 250"
                  className="border border-gray-300 outline-none rounded-lg h-10 px-3 text-sm focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="flex flex-col mt-4 gap-1">
              <label>Ingredients</label>
              {ingredients.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleChange(ingredients, setIngredients, index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="border border-gray-300 outline-none rounded-lg w-full h-10 px-3 text-sm focus:ring-2 focus:ring-green-500 transition-colors"
                  />
                  {ingredients.length > 1 && (
                    <span
                      className="text-2xl cursor-pointer text-red-500"
                      onClick={() => removeField(ingredients, setIngredients, index)}
                    >
                      ×
                    </span>
                  )}
                </div>
              ))}
              <h1
                className="text-green-600 cursor-pointer mt-2"
                onClick={() => addField(ingredients, setIngredients)}
              >
                + Add Ingredient
              </h1>
            </div>

            {/* Instructions */}
            <div className="flex flex-col mt-4 gap-1">
              <label>Instructions</label>
              {instructions.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-3">{index + 1}.</span>
                  <textarea
                    value={step}
                    onChange={(e) => handleChange(instructions, setInstructions, index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="border border-gray-300 outline-none rounded-lg w-full h-20 p-3 text-sm resize-none focus:ring-2 focus:ring-green-500 transition-colors"
                  />
                  {instructions.length > 1 && (
                    <span
                      className="text-2xl cursor-pointer text-red-500 mt-2"
                      onClick={() => removeField(instructions, setInstructions, index)}
                    >
                      ×
                    </span>
                  )}
                </div>
              ))}
              <h1
                className="text-green-600 cursor-pointer mt-2"
                onClick={() => addField(instructions, setInstructions)}
              >
                + Add Step
              </h1>
            </div>

            {/* Tags */}
            <div className="flex flex-col mt-4 gap-1">
              <label>Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-1 w-full sm:w-auto">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleChange(tags, setTags, index, e.target.value)}
                      placeholder="e.g. vegetarian"
                      className="border border-gray-300 outline-none rounded-lg w-full h-10 px-3 text-sm focus:ring-2 focus:ring-green-500 transition-colors"
                    />
                    {tags.length > 1 && (
                      <span
                        className="text-2xl cursor-pointer text-red-500"
                        onClick={() => removeField(tags, setTags, index)}
                      >
                        ×
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <h1
                className="text-green-600 cursor-pointer mt-2"
                onClick={() => addField(tags, setTags)}
              >
                + Add Tag
              </h1>
            </div>

            {/* Public */}
            <div className="flex flex-col gap-2 mt-4 text-gray-700">
              <div className="flex flex-row gap-2 items-center">
                <input
                  type="checkbox"
                  id="public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <label htmlFor="public">Share this recipe publicly</label>
              </div>
              <p className="text-sm">Public recipes will appear in the community feed for other users to discover.</p>
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="border border-gray-300 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Save Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;