import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImageUrl] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [servings, setServings] = useState("");
    const [calories, setCalories] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]); // ✅ always use `instruction`
    const [tags, setTags] = useState([""]);
    const [isPublic, setIsPublic] = useState(false);

    // 🔹 Load recipe when page opens
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();

                setTitle(data.title || "");
                setDescription(data.description || "");
                setImageUrl(data.image || "");
                setPrepTime(data.prepTime || "");
                setCookTime(data.cookTime || "");
                setServings(data.servings || "");
                setCalories(data.calories || "");
                setIngredients(data.ingredients?.length ? data.ingredients : [""]);
                setInstructions(data.instruction?.length ? data.instruction : [""]);
                setTags(data.tags?.length ? data.tags : [""]);
                setIsPublic(data.isPublic || false);
            } catch (err) {
                console.error("Failed to fetch recipe:", err);
            }
        };

        fetchRecipe();
    }, [id]);

    // 🔹 Helpers for input arrays
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

    // 🔹 Save changes (PUT)
   const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty ingredients, instructions, and tags
    const recipeData = {
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
        prepTime: prepTime.trim(),
        cookTime: cookTime.trim(),
        servings: servings.trim(),
        calories: calories.trim(),
        ingredients: ingredients.filter(item => item.trim() !== ""),
        instruction: instructions.filter(step => step.trim() !== ""),
        tags: tags.filter(tag => tag.trim() !== ""),
        isPublic,
    };

    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("You are not logged in ❌");
        return;
    }

    try {
        const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(recipeData),
        });

        const data = await res.json(); // parse the response

        if (res.ok) {
            toast.success("Recipe updated successfully ✅");
            navigate("/dashboard");
        } else {
            console.error("Update failed:", data);
            if (res.status === 403) {
                toast.error("You are not authorized to edit this recipe ❌");
            } else if (res.status === 404) {
                toast.error("Recipe not found ❌");
            } else {
                toast.error("Error: " + (data.error || data.message || "Unknown error"));
            }
        }
    } catch (err) {
        console.error("Network or server error:", err);
        toast.error("Failed to update recipe ❌");
    }
};

    return (
        <>
            <Navbar />
            <div className="mt-[90px] max-w-[850px] mx-auto mb-[50px]">
                <div className="flex items-center py-[10px]">
                    <Link
                        to="/my-recipes"
                        className="flex items-center gap-1 text-[#16A34A] font-[500]"
                    >
                        <MdArrowBack size={24} />
                        <span>Back to My Recipes</span>
                    </Link>
                </div>

                <div className="mt-[10px] py-[20px] px-[20px] mx-[20px] mb-[20px] shadow-lg rounded-lg">
                    <h1 className="font-[500] text-[22px]">Edit Recipe</h1>

                    {/* ✅ Same form as AddItem */}
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="flex flex-col mt-[20px] gap-[5px]">
                            <label>Recipe Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-gray-300 rounded-lg h-[40px] pl-[10px]"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col mt-[20px] gap-[5px]">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-300 rounded-lg h-[80px] pl-[10px] pt-[10px]"
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
                            <div className="flex flex-col mt-[20px] gap-[5px]">
                                <label>Image Preview</label>
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="h-[200px] object-cover rounded-lg"
                                />
                            </div>
                        )}

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

                        {/* Servings + Calories */}
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
                                        <span className="text-[20px] cursor-pointer text-red-500" onClick={() => removeField(ingredients, setIngredients, index)}> ×</span>
                                    )}
                                </div>
                            ))}
                            <h1 className="text-[#16A34A] cursor-pointer mt-2" onClick={() => addField(ingredients, setIngredients)}> + Add Ingredient</h1>
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
                                        <span className="text-[20px] cursor-pointer text-red-500" onClick={() => removeField(instructions, setInstructions, index)}> ×</span>
                                    )}
                                </div>
                            ))}
                            <h1 className="text-[#16A34A] cursor-pointer mt-2" onClick={() => addField(instructions, setInstructions)}> + Add Step</h1>
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
                                            <span className="text-[20px] cursor-pointer text-red-500" onClick={() => removeField(tags, setTags, index)}>  ×</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-[#16A34A] cursor-pointer mt-2" onClick={() => addField(tags, setTags)}>  + Add Tag</h1>
                        </div>

                        {/* Public */}
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

                        {/* Submit */}
                        <div className="mt-[20px] flex justify-end gap-[20px]">
                            <button
                                type="button"
                                onClick={() => navigate("/my-recipes")}
                                className="border border-gray-300 px-5 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditItem;
