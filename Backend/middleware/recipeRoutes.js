const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Recipe Schema
const recipeSchema = new mongoose.Schema({
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
  isPublic: Boolean
}, { timestamps: true }); // adds createdAt & updatedAt

const Recipe = mongoose.model("Recipe", recipeSchema);

// GET all public recipes (newest first)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET private recipes only (newest first)
router.get("/private", async (req, res) => {
  try {
    const privateRecipes = await Recipe.find({ isPublic: false }).sort({ createdAt: -1 });
    res.json(privateRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new recipe
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
