import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";
import Calories from "../../Components/Calories/Calories";
import RecipeList from "../../Components/RecipeList";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes"); 
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <Navbar />
      <RecipeBtn name="Dashboard"/>
      <Calories />
      <RecipeList recipes={recipes} emptyMessage="No public recipes found." />
    </>
  );
};

export default Dashboard;
