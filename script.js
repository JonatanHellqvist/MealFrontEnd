//måste gå att fixa favoriter på något vettigare sätt men fungerar för tillfället
let data;

// let recipeLi = document.getElementById("recipeLi");
let favoriteRecipes = JSON.parse(localStorage.getItem("favoriteslist")) || [];
let recipeDiv = document.getElementById("recipeDiv");
let recipeUl = document.getElementById("recipeUl");
// let favoritesBtn = document.createElement("button");
// favoritesBtn.innerText = "Add favorites";

// favoritesBtn.addEventListener("click", () => addFavorite(data));

//spagetti
function addFavorite(data) {
	console.log("add to favorites: ", data.meals[0].idMeal);
	favoriteRecipes.push(data.meals[0].idMeal);
	localStorage.setItem("favoriteslist", JSON.stringify(favoriteRecipes));
}

	


//randomknapp
let randomBtn = document.getElementById("randomBtn")
randomBtn.addEventListener("click", () => {
	recipeDiv.innerHTML = "";
	console.log("click på knapp");
	getRandomMeal();
});

//searchknapp
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
	let inputValue = document.getElementById("searchInput").value.trim();
	
	if (inputValue !== "") {
		searchRecipe(inputValue);
	}
	else {
		recipesDiv.innerText=("Fyll i sökfältet för att söka")
	}
	console.log("click på knapp");
	
})

//Kokbokknapp
let kokbokBtn = document.getElementById("kokBokBtn")
kokbokBtn.addEventListener("click", () => {
	// recipesDiv.innerHTML = "";
	
	localStorage.getItem("favoriteslist", JSON.stringify(favoriteRecipes));
	
	showFavorites();
})

function searchRecipe(inputValue) {
	recipeUl.innerHTML = "";
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
		.then(res => res.json())
		.then(data =>  {
			
			if (data.meals !== null) {
		
				recipeDiv.appendChild(recipeUl);
				
				data.meals.forEach(recipe => {

					let recipeLi = document.createElement("li");
					recipeLi.innerHTML = 
						`</br><b>Recept:</b> ${recipe.strMeal} <br>
						<img src="${recipe.strMealThumb}" style="width: 300px; height: 300px"<br><br>`
					recipeUl.appendChild(recipeLi);

				})

			} else {
				recipeDiv.innerText=("Hittade inga recept som matchade din sökning")	
			}

		})
}



function getRandomMeal() {
	recipeUl.innerHTML = "";
	
	
	fetch("https://www.themealdb.com/api/json/v1/1/random.php")
		.then (res => res.json())
		.then (responsedata => {
			data=responsedata;
			printRecipe(data)
		});
		
}

function showFavorites() {
	recipeUl.innerHTML = "";
	favoriteRecipes.forEach(idMeal => {
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(res => res.json())
            .then(data => {
				
				printRecipe(data);
			})
	})

	console.log(favoriteRecipes)
}

function printRecipe(data) {
	recipeDiv.innerHTML = "";

	let recipeLi = document.createElement("li");
	recipeLi.innerHTML = `
	<b>Recept:</b> ${data.meals[0].strMeal}, <br> 
	<img src="${data.meals[0].strMealThumb}" style="width: 300px; height: 300px", <br><br>`;
	
	let favoritesBtn = document.createElement("button");
	favoritesBtn.innerText = "Add favorites";
	favoritesBtn.addEventListener("click", () => addFavorite(data));

	recipeLi.appendChild(favoritesBtn);
	recipeUl.appendChild(recipeLi);
	recipeDiv.appendChild(recipeUl);
	
}








// document.getElementById("searchBtn").addEventListener("click",()=>{
// 	let inputValue = document.getElementById("searchInput").value

// 	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
// 		.then(response => response.json())
// 		.then(data =>  {
			
// 			const recipesDiv = document.getElementById("recipesDiv");
// 			recipesDiv.innerHTML = "";
// 			if (data.meals == null) {
// 				console.log("No meals")
// 				recipesDiv.innerText=("Hittade inga recept som matchade din sökning")
// 			} else {

// 				let recipeUl = document.createElement("ul");
// 				let recipeLi = document.createElement("li");
// 				recipesDiv.appendChild(recipeUl);

// 				data.meals.forEach(meal => {
// 					let recipeLi = document.createElement("li");
					
// 					recipeLi.innerHTML = 
// 						`</br><b>Recept:</b> ${meal.strMeal} <br>
// 						<img src="${meal.strMealThumb}" style="width: 300px; height: 300px"<br><br>`
					 

// 					recipeUl.appendChild(recipeLi);

// 				})
				
				
				
				
// 			}
// 		})
// })
