import React from "react"
import IngredientsList from "./IngredientsList"
import CloudeRecipe from "./CloudeRecipe"
export default function Main(){
    const [ingredients, setIngredients] = React.useState([])

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    const [recipeShown, setRecipeShown] = React.useState(false)

    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
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
            toggleRecipeShown={toggleRecipeShown}
            ingredientsListItems={ingredientsListItems}
                />}
            {recipeShown && <CloudeRecipe />}
        </main>
    )
}