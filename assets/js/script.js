var chickenBtnEl = document.querySelector("#chickenBtn");
var beefBtnEl = document.querySelector("#beefBtn");
var porkBtnEl = document.querySelector("#porkBtn");
var fishBtnEl = document.querySelector("#fishBtn");
var veggieBtnEl = document.querySelector("#vegetarianBtn");


//Health button queryselector
var healthBtnEl = document.querySelector("#healthBtn");
var ketohealthBtnEl = document.querySelector("#ketohealthBtn");
var veganhealthBtnEl = document.querySelector("#veganhealthBtn");
var paleohealthBtnEl = document.querySelector("#paleohealthBtn");

let recipeName = "";
let recipeImg = "";
let ingredients = [];
let recipeUrl = "";

/// function to get recipe based on food input
var getRecipe = function(event) {
    
    event.preventDefault();
    ingredients = [];
    const food = event.target.textContent;

    const apiCall = "https://api.edamam.com/api/recipes/v2?type=public&q=" + food + "&app_id=9808691f&app_key=%20ac15455f30499a61c8f7b072116879c7"

    // get an index for a random recipe
    const recipeNum = Math.floor(Math.random()*20);
    
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){

            console.log(data.hits[recipeNum].recipe);
            console.log(data.hits[recipeNum].recipe.ingredientLines);

            // get the name of a recipe
            recipeName = data.hits[recipeNum].recipe.label;
        
            //Adds recipe name to H2 tag when clicked
            $("#rName").text(recipeName);

            // get the link to a picture of the recipe
            recipeImg = data.hits[recipeNum].recipe.image;
            
            //Get picture to show up
            $("#rImage").html('<img src="' + recipeImg + '">');

            // get an array list of the recipe ingredients
            ingredients = data.hits[recipeNum].recipe.ingredientLines;

            $("#recipeList").empty();
            // append each ingredient as an li
            for(var i=0; i<ingredients.length; i++) {
                $("#recipeList").append("<li>" + ingredients[i] + "</li>");
            }
            
            // get the link to the full recipe
            recipeUrl = data.hits[recipeNum].recipe.url;

            // Add link to bottom of the box for people to click on
            $("#recipeLink").html('<a href="' + recipeUrl + '">Click here to view full recipe</a>')

        .then(getNutrition(recipeName));
    })
})
}


// function to get nutrition facts for recipe
var getNutrition = function(recipe) {

    // reset nutrition values
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;

    let searchCode = "";

    // make ingredients search friendly
    for(var i=0; i<ingredients.length; i++) {
        let ingrClean = ingredients[i].replace(/ *\([^)]*\) */g, "");
        let ingrClean2 = ingrClean[0].split(",",1);
       
        ingredients[i] = ingrClean2[0];
        ingredients[i] = ingredients[i].replace(/\s/g, "%20");
    }

    // get nutrition for each ingredient & add to totals
    for(var i=0; i<ingredients.length; i++) {
        searchCode = ingredients[i];
        
        // request nutrition info from API for ingredient
        let apiCall = "https://api.edamam.com/api/nutrition-data?app_id=c15e6a0d&app_key=4fab285b283f1834189d7b315b26dbd6&nutrition-type=cooking&ingr=" + searchCode;

        fetch(apiCall).then(function(response) {
            response.json().then(function(data){
    
                console.log(data);

                // add ingredient calories to total
                calories += data.calories;
                $('#calories-box').html('<b>Total Calories:</b> ' + calories);
    
                // add ingredient fat to total
                fat += Math.floor(data.totalNutrients.FAT.quantity);
                $('#fat-box').html('<b>Total Fat:</b> ' + fat);
    
                // add ingredient protein to total
                protein += Math.floor(data.totalNutrients.PROCNT.quantity);
                $('#protein-box').html('<b>Total Protein:</b> ' + protein);
    
                // add ingredient carbs to total
                carbs += Math.floor(data.totalNutrients.CHOCDF.quantity);
                $('#carbs-box').html('<b>Total Carbs:</b> ' + carbs);

            })
        })
    }
}

//Function for Covid eating button 
var getHealthRecipe = function(event) {
    event.preventDefault();

    // const diet = event.target.textContent;
    let diet = $(this).attr('data-input');
    console.log(diet);

    const apiCall = 'https://api.edamam.com/search?q=&health='  + diet + '&from=0&to=99&app_id=9808691f&app_key=%20ac15455f30499a61c8f7b072116879c7&from=0&to=99'

    // const apiCall = "https://api.edamam.com/search?q=&health=immuno-supportive&from=0&to=99&app_id=9808691f&app_key=%20ac15455f30499a61c8f7b072116879c7&from=0&to=99"

        // get an index for a random recipe
        const recipeNum = Math.floor(Math.random()*20);


    
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){

            console.log(data);

     // get the name of a recipe
     recipeName = data.hits[recipeNum].recipe.label;
        
     //Adds recipe name to H2 tag when clicked
     $("#rName").text(recipeName);

     // get the link to a picture of the recipe
     recipeImg = data.hits[recipeNum].recipe.image;
     
     //Get picture to show up
     $("#rImage").html('<img src="' + recipeImg + '">');

     // get an array list of the recipe ingredients
     ingredients = data.hits[recipeNum].recipe.ingredientLines;

     $("#recipeList").empty();
     // append each ingredient as an li
     for(var i=0; i < ingredients.length; i++) {
         $("#recipeList").append('<li>' + ingredients[i] + '</li>');
    
     }
     
     // get the link to the full recipe
     recipeUrl = data.hits[recipeNum].recipe.url;

     // Add link to bottom of the box for people to click on
     $("#recipeLink").html('<a href="' + recipeUrl + '">Click here to view full recipe</a>')

 .then(getNutrition(recipeName));
})
})
}

//Health diet button even listener
healthBtnEl.addEventListener("click", getHealthRecipe);
ketohealthBtnEl.addEventListener("click", getHealthRecipe);
veganhealthBtnEl.addEventListener("click", getHealthRecipe);
paleohealthBtnEl.addEventListener("click", getHealthRecipe);

chickenBtnEl.addEventListener("click", getRecipe);
porkBtnEl.addEventListener("click", getRecipe);
beefBtnEl.addEventListener("click", getRecipe);
fishBtnEl.addEventListener("click", getRecipe);
veggieBtnEl.addEventListener("click", getRecipe);