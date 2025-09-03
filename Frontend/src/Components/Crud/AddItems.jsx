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

    // Map frontend state to backend field names
const recipeData = {
  title,
  description,
  image,
  prepTime,
  cookTime,
  servings,
  calories,
  ingredients,
  instruction: instructions.filter(step => step.trim() !== ""), // remove empty steps
  tags,
  isPublic,
};


    // 🔹 Debug: log recipeData to ensure instructions are included
    console.log("Submitting recipe:", recipeData);

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
        alert("Error: " + error.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save recipe ❌");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-[90px] max-w-[850px] mx-auto mb-[50px]">
        <div className="flex items-center py-[10px]">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-[#16A34A] font-[500]"
          >
            <MdArrowBack size={24} />
            <span>Back to My Recipes</span>
          </Link>
        </div>

        <div className="mt-[10px] py-[20px] px-[20px] mx-[20px] mb-[20px] shadow-lg rounded-lg">
          <h1 className="font-[500] text-[22px]">Add New Recipe</h1>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="flex flex-col mt-[20px] gap-[5px]">
              <label htmlFor="recipeTitle">Recipe Title</label>
              <input
                type="text"
                id="recipeTitle"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter recipe title"
                className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col mt-[20px] gap-[5px]">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your recipe"
                className="border border-gray-300 outline-none rounded-lg h-[80px] pl-[10px] pt-[10px] text-[14px] text-[#575959]"
              />
            </div>

            {/* Image */}
            <div className="flex flex-col mt-[20px] gap-[5px]">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]"
              />
            </div>

            {image && (
              <div className="flex flex-col mt-[10px] gap-[5px]">
                <label>Image Preview</label>
                <img
                  src={image}
                  alt="Preview"
                  className="h-[200px] object-cover rounded-lg"
                />
              </div>
            )}

            {/* Prep & Cook Time */}
            <div className="flex mt-[20px] gap-[20px]">
              <div className="flex flex-col w-[50%] gap-[5px]">
                <label>Prep Time</label>
                <input
                  type="text"
                  required
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="e.g. 15 min"
                  className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px]"
                />
              </div>
              <div className="flex flex-col w-[50%] gap-[5px]">
                <label>Cook Time</label>
                <input
                  type="text"
                  required
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="e.g. 30 min"
                  className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px]"
                />
              </div>
            </div>

            {/* Servings & Calories */}
            <div className="flex mt-[20px] gap-[20px]">
              <div className="flex flex-col w-[50%] gap-[5px]">
                <label>Servings</label>
                <input
                  type="number"
                  required
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="e.g. 4"
                  className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px]"
                />
              </div>
              <div className="flex flex-col w-[50%] gap-[5px]">
                <label>Calories (per serving)</label>
                <input
                  type="text"
                  required
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="e.g. 250"
                  className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px]"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="flex flex-col mt-[20px] gap-[5px]">
              <label>Ingredients</label>
              {ingredients.map((item, index) => (
                <div key={index} className="flex items-center gap-[10px]">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleChange(ingredients, setIngredients, index, e.target.value)
                    }
                    placeholder={`Ingredient ${index + 1}`}
                    className="border border-gray-300 outline-none rounded-lg w-full h-[40px] pl-[10px]"
                  />
                  {ingredients.length > 1 && (
                    <span
                      className="text-[20px] cursor-pointer text-red-500"
                      onClick={() => removeField(ingredients, setIngredients, index)}
                    >
                      ×
                    </span>
                  )}
                </div>
              ))}
              <h1
                className="text-[#16A34A] cursor-pointer mt-2"
                onClick={() => addField(ingredients, setIngredients)}
              >
                + Add Ingredient
              </h1>
            </div>

            {/* Instructions */}
            <div className="flex flex-col mt-[20px] gap-[5px]">
              <label>Instructions</label>
              {instructions.map((step, index) => (
                <div key={index} className="flex items-center gap-[10px]">
                  <span>{index + 1}.</span>
                  <textarea
                    value={step}
                    onChange={(e) =>
                      handleChange(instructions, setInstructions, index, e.target.value)
                    }
                    placeholder={`Step ${index + 1}`}
                    className="border border-gray-300 outline-none rounded-lg w-full h-[60px] pl-[10px]"
                  />
                  {instructions.length > 1 && (
                    <span
                      className="text-[20px] cursor-pointer text-red-500"
                      onClick={() => removeField(instructions, setInstructions, index)}
                    >
                      ×
                    </span>
                  )}
                </div>
              ))}
              <h1
                className="text-[#16A34A] cursor-pointer mt-2"
                onClick={() => addField(instructions, setInstructions)}
              >
                + Add Step
              </h1>
            </div>

            {/* Tags */}
            <div className="flex flex-col mt-[20px] gap-[5px]">
              <label>Tags</label>
              <div className="flex flex-row flex-wrap gap-[10px]">
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-[5px] w-[30%]">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleChange(tags, setTags, index, e.target.value)}
                      placeholder="e.g. vegetarian"
                      className="border border-gray-300 outline-none rounded-lg w-full h-[40px] pl-[10px]"
                    />
                    {tags.length > 1 && (
                      <span
                        className="text-[20px] cursor-pointer text-red-500"
                        onClick={() => removeField(tags, setTags, index)}
                      >
                        ×
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <h1
                className="text-[#16A34A] cursor-pointer mt-2"
                onClick={() => addField(tags, setTags)}
              >
                + Add Tag
              </h1>
            </div>

            {/* Public Checkbox */}
            <div className="flex flex-col gap-[10px] mt-[20px] text-[#575959]">
              <div className="flex flex-row gap-[10px]">
                <input
                  type="checkbox"
                  id="public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <label htmlFor="public">Share this recipe publicly</label>
              </div>
              <p>Public recipes will appear in the community feed for other users to discover.</p>
            </div>

            {/* Buttons */}
            <div className="mt-[20px] flex justify-end gap-[20px]">
              <button type="button" className="border border-gray-300 px-[20px] py-[8px] rounded-[8px]">
                Cancel
              </button>
              <button type="submit" className="border px-[20px] py-[8px] rounded-[8px] bg-green-600 text-white hover:bg-green-700">
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
