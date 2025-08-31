import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import RecipeList from "../../Components/RecipeList";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  const fetchPrivateRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/recipes/private", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error("Error fetching private recipes:", err);
    }
  };
  fetchPrivateRecipes();
}, []);


  return (
    <>
      <Navbar />
      <RecipeBtn name="My Recipe" />
      <RecipeList recipes={recipes} emptyMessage="No private recipes found." />
    </>
  );
};

export default MyRecipe;
