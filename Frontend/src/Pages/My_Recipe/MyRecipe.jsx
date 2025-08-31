import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import RecipeList from "../../Components/RecipeList";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchPrivateRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes/private");
        const data = await res.json();
        setRecipes(data); // backend already returns newest first
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
