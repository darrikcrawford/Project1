let recipeName = "";
let recipeImg = "";
let ingredients = [];
let recipeUrl = "";

// function to get recipe based on food input
var getRecipe = function(food) {

    const apiCall = "https://api.edamam.com/api/recipes/v2?type=public&q=" + food + "&app_id=9808691f&app_key=%20ac15455f30499a61c8f7b072116879c7"

    // get an index for a random recipe
    const recipeNum = Math.floor(Math.random()*20);
    
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){
            console.log(data.hits);

            // get the name of a recipe
            recipeName = data.hits[recipeNum].recipe.label;
            console.log(recipeName);

            // get the link to a picture of the recipe
            recipeImg = data.hits[recipeNum].recipe.image;
            console.log(recipeImg);

            // get an array list of the recipe ingredients
            ingredients = data.hits[recipeNum].recipe.ingredientLines;
            console.log(ingredients)

            // get the link to the full recipe
            recipeUrl = data.hits[recipeNum].recipe.url;
            console.log(recipeUrl);
        })
    })
}

// function to get nutrition facts for recipe
var getNutrition = function(recipe) {
    console.log("getting nutrition: " + recipe);
}

getRecipe("chicken");