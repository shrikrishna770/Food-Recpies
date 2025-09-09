const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth"); // Recipe Schema 
const recipeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    image: String,
    prepTime: String,
    cookTime: String,
    servings: String,
    calories: String,
    ingredients: [String],
    instruction: [String],
    tags: [String],
    isPublic: { type: Boolean, default: false },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true });
const Recipe = mongoose.model("Recipe", recipeSchema);
// GET all public recipes 
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET private recipes for logged-in user 
router.get("/private", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id, isPublic: false })
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); // POST new recipe 
router.post("/", auth, async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body, user: req.user.id,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET single recipe 
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name email");
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE recipe (only owner) 
router.put("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE recipe (only owner) 
// DELETE recipe (only owner) 
router.delete("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    
    // This is the correct line
    await recipe.deleteOne();
    
    res.json({ message: "Recipe deleted successfully" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;