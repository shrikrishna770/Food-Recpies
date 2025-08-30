import { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "../Navbar/Navbar";

const AddItem = () => {
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    const [tags, setTags] = useState([""]);
    const [image, setImageUrl] = useState("")

    const handleChange = (array, setArray, index, value) => {
        const newArray = [...array];
        newArray[index] = value;
        setArray(newArray);
    };

    const addField = (array, setArray) => {
        setArray([...array, ""]);
    };

    const removeField = (array, setArray, index) => {
        if (array.length > 1) {
            setArray(array.filter((_, i) => i !== index));
        }
    };

    return (
        <>
        <Navbar/>
        <div className="mt-[90px] max-w-[850px] mx-auto  mb-[50px]">
            <div className="flex items-center py-[10px]">
                <Link to="/dashboard" className="flex items-center gap-1 text-[#16A34A] font-[500]">
                    <MdArrowBack size={24} />
                    <span>Back to My Recipes</span>
               </Link>
            </div>

            <div className="mt-[10px] py-[20px] px-[20px] mx-[20px] mb-[20px] shadow-lg">
                <h1 className="font-[500] text-[22px]">Add New Recipe</h1>
                <form>
                    <div className="flex flex-col mt-[20px] gap-[5px]">
                        <label htmlFor="recipeTitle">Recipe Title</label>
                        <input type="text" id="recipeTitle" required placeholder="Enter recipe title" className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]" />
                    </div>

                    <div className="flex flex-col mt-[40px] gap-[5px]">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" placeholder="Brief description of your recipe" className="border border-gray-300 outline-none rounded-lg h-[80px] pl-[10px] pt-[10px] text-[14px] text-[#575959]" />
                    </div>

                    <div className="flex flex-col mt-[30px] gap-[5px]">
                        <label htmlFor="Image URL">Image URL</label>
                        <input type="url" id="recipeTitle" required placeholder="Enter recipe title" className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]" onClick={e => setImageUrl(e.target.value)} />
                    </div>
                    {(!image) ? "" : (<div className="flex flex-col mt-[30px] gap-[5px]">
                        <label>Image Preview</label>
                        <img src={image} alt="Preview" className="h-[200px] object-cover" />
                    </div>)}


                    <div className="flex mt-[30px] gap-[30px]">
                        <div className="flex flex-col w-[50%] gap-[5px]" >
                            <label htmlFor="Prep Time">Prep Time</label>
                            <input type="text" required className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]" placeholder="e.g. 15 min" />
                        </div>
                        <div className="flex flex-col w-[50%] gap-[5px]">
                            <label htmlFor="Cook Time">Cook Time</label>
                            <input type="text" required className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]" placeholder="e.g. 30 min" />
                        </div>
                    </div>
                    <div className="flex mt-[30px] gap-[30px]">
                        <div className="flex flex-col w-[50%] gap-[5px]" >
                            <label htmlFor="Serving">Serving</label>
                            <input type="number" required className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]" placeholder="e.g. 4" />
                        </div>
                        <div className="flex flex-col w-[50%] gap-[5px]">
                            <label htmlFor="Calories (per serving)">Calories (per serving)</label>
                            <input type="text" required className="border border-gray-300 outline-none rounded-lg h-[40px] pl-[10px] text-[14px] text-[#575959]" placeholder="e.g. 30 min" />
                        </div>
                    </div>


                    <div className="flex flex-col mt-[40px] gap-[5px]">
                        <label>Ingredients</label>
                        {ingredients.map((item, index) => (
                            <div key={index} className="flex items-center gap-[10px]">
                                <input type="text" value={item} onChange={e => handleChange(ingredients, setIngredients, index, e.target.value)} placeholder={`Ingredient ${index + 1}`} className="border border-gray-300 outline-none rounded-lg w-[100%] h-[40px] pl-[10px] text-[14px] text-[#575959]" />
                                {ingredients.length > 1 && <span className="text-[20px] cursor-pointer text-red-500" onClick={() => removeField(ingredients, setIngredients, index)}>×</span>}
                            </div>
                        ))}
                        <h1 className="text-[#16A34A] cursor-pointer mt-2" onClick={() => addField(ingredients, setIngredients)}>+ Add Ingredient</h1>
                    </div>

                    <div className="flex flex-col mt-[40px] gap-[5px]">
                        <label>Instructions</label>
                        {instructions.map((step, index) => (
                            <div key={index} className="flex items-center gap-[10px]">
                                <span>{index + 1}.</span>
                                <textarea type="text" value={step} onChange={e => handleChange(instructions, setInstructions, index, e.target.value)} placeholder={`Step ${index + 1}`} className="border border-gray-300 outline-none rounded-lg w-[100%] h-[60px] pl-[10px] text-[14px] text-[#575959] pt-[5px]" />
                                {instructions.length > 1 && <span className="text-[20px] cursor-pointer text-red-500" onClick={() => removeField(instructions, setInstructions, index)}>×</span>}
                            </div>
                        ))}
                        <h1 className="text-[#16A34A] cursor-pointer mt-2" onClick={() => addField(instructions, setInstructions)}>+ Add Step</h1>
                    </div>

                    <div className="flex flex-col mt-[40px] gap-[5px]">
                        <label>Tags</label>
                        <div className="flex flex-row flex-wrap gap-[20px]">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex items-center gap-[5px] w-[30%] ">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={e => handleChange(tags, setTags, index, e.target.value)}
                                        placeholder="e.g. vegetarian"
                                        className="border border-gray-300 outline-none rounded-lg w-[100%] h-[50px] pl-[10px] text-[14px] text-[#575959] pt-[2px]"
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
                    <div className="flex flex-col gap-[10px] mt-[40px] text-[#575959]">
                        <div className="flex flex-row gap-[10px]">
                            <input type="checkbox" id="public" /> <label htmlFor="public">Share this recipe publicly</label>
                        </div>
                        <p>Public recipes will appear in the community feed for other users to discover.</p>
                    </div>
                    <div className="mt-[40px] flex justify-end gap-[20px] ">
                        <button className="border border-gray-300 px-[20px] py-[8px] rounded-[8px]">Cancel</button>
                        <button className="border px-[20px] py-[8px] rounded-[8px] bg-green-600 text-white hover:bg-green-700">Save Recipe</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default AddItem;
