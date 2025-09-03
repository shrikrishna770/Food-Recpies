import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { MdArrowBack } from "react-icons/md";

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

const {
  image,
  title,
  tags = [],
  description,
  prepTime,
  cookTime,
  servings,
  calories,
  ingredients = [],
  instruction: instructions = [], // ✅ backend field 'instruction'
  isPublic,
} = recipe;


  return (
    <div>
      <Navbar />

      <div className="mt-[100px] max-w-[1100px] w-full mx-auto">
        <div className="flex items-center py-[10px] px-[10px]">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-[#16A34A] font-[500]"
          >
            <MdArrowBack size={24} />
            <span>Back to My Recipes</span>
          </Link>
        </div>

        <div className="mt-0 mx-[40px] mb-[20px] shadow-lg rounded-xl p-[20px]">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          )}

          <h1 className="text-3xl font-bold mt-4">{title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-700 mt-4">{description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
            <div className="p-3 border rounded-lg">
              <strong>Prep Time:</strong> {prepTime}
            </div>
            <div className="p-3 border rounded-lg">
              <strong>Cook Time:</strong> {cookTime}
            </div>
            <div className="p-3 border rounded-lg">
              <strong>Servings:</strong> {servings}
            </div>
            <div className="p-3 border rounded-lg">
              <strong>Calories:</strong> {calories}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
  <h2 className="text-xl font-semibold mb-2">Instructions</h2>
  {instructions.length > 0 ? (
    <ol className="list-decimal list-inside text-gray-700 space-y-2">
      {instructions.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  ) : (
    <p className="text-gray-500">No instructions provided.</p>
  )}
</div>


          <div className="mt-6">
            <p className="italic text-gray-600">
              {isPublic
                ? "🌍 This recipe is shared publicly."
                : "🔒 This recipe is private."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
