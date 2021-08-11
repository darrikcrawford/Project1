let recipeName = "";
let recipeImg = "";
let ingredients = [];
let recipeUrl = "";

let calories = 0;
let fat = 0;
let protein = 0;
let carbs = 0;


// function to get recipe based on food input
var getRecipe = function(food) {

    const apiCall = "https://api.edamam.com/api/recipes/v2?type=public&q=" + food + "&app_id=9808691f&app_key=%20ac15455f30499a61c8f7b072116879c7"

    // get an index for a random recipe
    const recipeNum = Math.floor(Math.random()*20);
    
    fetch(apiCall).then(function(response) {
        response.json().then(function(data){

            // get the name of a recipe
            recipeName = data.hits[recipeNum].recipe.label;
        
            //Adds recipe name to H2 tag when clicked
            $("#chickenBtn").on("click", function () {
                $("#rName").text(recipeName);
            

            // get the link to a picture of the recipe
            recipeImg = data.hits[recipeNum].recipe.image;
            //Get picture to show up 
            $("#rImage").html('<img src="' + recipeImg + '">');
            console.log(recipeImg);

            // get an array list of the recipe ingredients
            ingredients = data.hits[recipeNum].recipe.ingredientLines;
            //Somehow append array to recipeList / Researching
          $("#recipeList").html("<li>" + ingredients + "</li>");

            console.log(ingredients);

            
          // get the link to the full recipe
            recipeUrl = data.hits[recipeNum].recipe.url;
         // Add link to bottom of the box for people to click on
            $("#recipeLink").html('<a href="' + recipeUrl + '" target="_blank">Click here to view full recipe</a>');

            console.log(recipeUrl);
        }).then(getNutrition);
    })
})
}

// function to get nutrition facts for recipe
var getNutrition = function() {

    let searchCode = "";

    // make ingredients search friendly
    for(var i=0; i<ingredients.length; i++) {
        console.log(ingredients[i]);
        let ingrClean = ingredients[i].split("(",1);
        let ingrClean2 = ingrClean[0].split(",",1);
       
        ingredients[i] = ingrClean2[0];

        ingredients[i] = ingredients[i].replace(/\s/g, "%20");
    }

    // get nutrition for each ingredient & add to totals
    for(var i=0; i<ingredients.length; i++) {
        searchCode = ingredients[i];
        console.log(searchCode);
        
        // request nutrition info from API for ingredient
        let apiCall = "https://api.edamam.com/api/nutrition-data?app_id=c15e6a0d&app_key=4fab285b283f1834189d7b315b26dbd6&nutrition-type=cooking&ingr=" + searchCode;

        fetch(apiCall).then(function(response) {
            response.json().then(function(data){
                console.log(data);
    
                // add ingredient calories to total
                calories += data.calories;
                console.log("Calories: " + calories);
    
                // add ingredient fat to total
                fat += Math.floor(data.totalNutrients.FAT.quantity);
                console.log("Fat: " + fat + data.totalNutrients.FAT.unit);
    
                // add ingredient protein to total
                protein += Math.floor(data.totalNutrients.PROCNT.quantity);
                console.log("Protein: " + protein + data.totalNutrients.PROCNT.unit)
    
                // add ingredient carbs to total
                carbs += Math.floor(data.totalNutrients.CHOCDF.quantity);
                console.log("Carbs: " + carbs + data.totalNutrients.CHOCDF.unit)

            })
        })
    }
}

getRecipe("chicken");