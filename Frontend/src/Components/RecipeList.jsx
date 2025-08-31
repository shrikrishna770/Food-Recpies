import { motion } from "framer-motion";
import CardComponent from "./Card/Card";

const RecipeList = ({ recipes, emptyMessage }) => {
  if (!recipes || recipes.length === 0) {
    return <p className="text-gray-500 text-center w-full">{emptyMessage}</p>;
  }

  return (
    <div className="max-w-[1500px] w-full m-auto flex flex-wrap gap-[35px] p-[20px] px-4 mt-[20px]">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.01 }} 
        >
          <CardComponent
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            prepTime={recipe.prepTime}
            servings={recipe.servings}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RecipeList;
