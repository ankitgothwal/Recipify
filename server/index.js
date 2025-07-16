const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve React static files
app.use(express.static(path.join(__dirname, "../dist")));

// AI Recipe Endpoint
app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  const systemPrompt = `
You are a helpful recipe generator. Given a list of ingredients, your task is to suggest a complete and realistic recipe. You can include common pantry ingredients (like salt, oil, spices) if needed, but focus on using the provided ingredients as the base.

Return the response in **Markdown format** with the following structure:

## Recipe Name

### Ingredients
- ingredient 1
- ingredient 2
...

### Instructions
1. Step 1
2. Step 2
...

Ensure the recipe is easy to follow, practical to cook at home, and includes all necessary steps.
`;

  const finalPrompt = `${systemPrompt}\n\nHere are the available ingredients: ${ingredients.join(", ")}.`;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      { inputs: finalPrompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    const recipe = response.data[0]?.generated_text || "No recipe found.";
    res.json({ recipe });
  } catch (error) {
    console.error("Error fetching recipe:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

// Serve frontend for all other routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
