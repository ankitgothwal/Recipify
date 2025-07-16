import React, { useState, useEffect } from "react";
import IngredientsList from "./IngredientsList"
import CloudeRecipe from "./CloudeRecipe"

export default function Main(){
    const [ingredients, setIngredients] = useState([])

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    const [recipe, setRecipe] = useState("")
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const getRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
        });

        const data = await response.json();

        if (response.ok) {
        setRecipe(data.recipe); // markdown content
        } else {
        setError("Failed to generate recipe.");
        }
    } catch (err) {
        setError("Error contacting recipe service.");
        console.error(err);
    } finally {
        setLoading(false);
    }
    };

    return(
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
            <IngredientsList ingredients={ingredients}
            getRecipe={getRecipe}
            ingredientsListItems={ingredientsListItems}
                />}
            {recipe && <CloudeRecipe recipe={recipe} />}
        </main>
    )
}