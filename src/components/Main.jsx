import React from "react"
import IngredientsList from "./IngredientsList"
import CloudeRecipe from "./CloudeRecipe"
import {getRecipeFromMistral} from "../ai"

export default function Main(){
    const [ingredients, setIngredients] = React.useState([])

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }
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