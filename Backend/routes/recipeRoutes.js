const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth"); // use JWT auth

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner
  title: { type: String, required: true },
  description: String,
  image: String,
  prepTime: String,
  cookTime: String,
  servings: String,
  calories: String,
  ingredients: [String],
  steps: [String],
  tags: [String],
  isPublic: { type: Boolean, default: false } // private by default
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);

// GET all public recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublic: true }).sort({ createdAt: -1 }).populate("user", "name");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET private recipes for logged-in user
router.get("/private", auth, async (req, res) => {
  try {
    const privateRecipes = await Recipe.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(privateRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new recipe (requires login)
router.post("/", auth, async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      user: req.user.id // 🔥 add logged-in user as owner
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name");
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
