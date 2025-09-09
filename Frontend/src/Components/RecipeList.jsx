import { motion } from "framer-motion";
import CardComponent from "./Card/Card";

const RecipeList = ({ recipes, emptyMessage }) => {
  if (!recipes || recipes.length === 0) {
    return <p className="text-gray-500 text-center w-full mt-10">{emptyMessage}</p>;
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 xxs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-8 mt-8">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.01 }}
        >
          <CardComponent
            _id={recipe._id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            servings={recipe.servings}
            calories={recipe.calories}
            ingredients={recipe.ingredients}
            instruction={recipe.instruction}
            tags={recipe.tags}
            isPublic={recipe.isPublic}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeList;