//måste gå att fixa favoriter på något vettigare sätt men fungerar för tillfället
let data;


let favoriteRecipes = JSON.parse(localStorage.getItem("favoriteslist")) || [];


let randomMealUl = document.getElementById("randomMealUl");
let favoritesBtn = document.createElement("button");
favoritesBtn.innerText = "Add favorites";

favoritesBtn.addEventListener("click", () => addFavorite(data));

//spagetti
function addFavorite(data) {
	console.log("add to favorites: ", data.meals[0].idMeal);
	favoriteRecipes.push(data.meals[0].idMeal);
	localStorage.setItem("favoriteslist", JSON.stringify(favoriteRecipes));
}

	


//randomknapp
let randomBtn = document.getElementById("randomBtn")
randomBtn.addEventListener("click", () => {
	recipesDiv.innerHTML = "";
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
	recipesDiv.innerHTML = "";
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
		.then(res => res.json())
		.then(data =>  {
			
			const recipesDiv = document.getElementById("recipesDiv");
			
			if (data.meals !== null) {

				let recipeUl = document.createElement("ul");
				recipesDiv.appendChild(recipeUl);
				
				data.meals.forEach(recipe => {
					let recipeLi = document.createElement("li");
					
					
					recipeLi.innerHTML = 
						`</br><b>Recept:</b> ${recipe.strMeal} <br>
						<img src="${recipe.strMealThumb}" style="width: 300px; height: 300px"<br><br>`
					 

					recipeUl.appendChild(recipeLi);

				})

			} else {
				recipesDiv.innerText=("Hittade inga recept som matchade din sökning")	
			}

		})
}



function getRandomMeal() {
	randomMealUl.innerHTML = "";
	
	
	fetch("https://www.themealdb.com/api/json/v1/1/random.php")
		.then (res => res.json())
		.then (responsedata => {
			data=responsedata;
			console.log("meal id: ",(data.meals[0]).idMeal);
			
			
				let randomMealLi = document.createElement("li");

				randomMealLi.innerHTML = `
				<b>Recept:</b> ${data.meals[0].strMeal}, <br> 
				<img src="${data.meals[0].strMealThumb}" style="width: 300px; height: 300px", <br><br>
				<b>Kategori:</b> ${data.meals[0].strCategory}, <br>
				<b>Instruktioner:</b> ${data.meals[0].strInstructions}`;

				
			

				recipesDiv.appendChild(randomMealUl);
				randomMealUl.appendChild(randomMealLi);
				randomMealLi.appendChild(favoritesBtn);
		});
		
}

function showFavorites() {
	recipesDiv.innerHTML = "";
	let recipeUl = document.createElement("ul");

	favoriteRecipes.forEach(idMeal => {
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(res => res.json())
            .then(data => {
				let li = document.createElement("li");
				li.innerHTML = `
				<b>Recept:</b> ${data.meals[0].strMeal}, <br> 
				<img src="${data.meals[0].strMealThumb}" style="width: 300px; height: 300px", <br><br>`;
				
				recipeUl.appendChild(li);
				recipesDiv.appendChild(recipeUl);
			})
	})
	console.log(favoriteRecipes)

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
