//måste gå att fixa favoriter på något vettigare sätt men fungerar för tillfället
//går det lösa utan att lyfta ut den
let data;

// let recipeLi = document.getElementById("recipeLi");
let favoriteRecipes = JSON.parse(localStorage.getItem("favoriteslist")) || [];
let recipeDiv = document.getElementById("recipeDiv");
let recipeUl = document.getElementById("recipeUl");
// let favoritesBtn = document.createElement("button");
// favoritesBtn.innerText = "Add favorites";

// favoritesBtn.addEventListener("click", () => addFavorite(data));

//spagetti
// function addFavorite(data) {
// 	console.log("add to favorites: ", data.meals[0].idMeal);
// 	favoriteRecipes.push(data.meals[0].idMeal);
// 	localStorage.setItem("favoriteslist", JSON.stringify(favoriteRecipes));

// 	// const addmessage = `<p>Added ${data.meals[0].idMeal} to favorites<p>`
// 	recipeDiv.innerHTML = `<p>Added <b>Id:</b> ${data.meals[0].idMeal} <b>Recept:</b> ${data.meals[0].strMeal} to favorites<p>`;
// }

function addFavorite(data) {

	fetch('http://localhost:8080/meal', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({
			id : data.meals[0].idMeal,
			name : data.meals[0].strMeal,
			comment : "test"
		})
	})
		.then(() =>{
			recipeDiv.innerHTML = `
			<p>Added <b>Id:</b> ${data.meals[0].idMeal}<b>Recept:</b> ${data.meals[0].strMeal} to favorites<p>`;

			console.log("add to favorites: ", data.meals[0].idMeal);
		})	
}

function removeFavorite(data) {
	console.log("remove from favorites: ", data.meals[0].idMeal);
	const removeId = favoriteRecipes.indexOf(data.meals[0].idMeal);

	if(removeId != -1) {
	// favoriteRecipes.splice(favoriteRecipes.indexOf(data.meals[0].idMeal),1);
	favoriteRecipes.splice(removeId,1)
	localStorage.setItem("favoriteslist", JSON.stringify(favoriteRecipes));

	recipeDiv.innerHTML = `<p>Removed <b>Id:</b> ${data.meals[0].idMeal} <b>Recept:</b> ${data.meals[0].strMeal} from favorites<p>`;
	}else {
		console.log("inte i favorites")
	}
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
		recipeDiv.innerText=("Fyll i sökfältet för att söka")
	}
	console.log("click på knapp");
	
})

//Kokbokknapp
let kokbokBtn = document.getElementById("kokBokBtn")
kokbokBtn.addEventListener("click", () => {
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
						`<b>Id:</b> ${recipe.idMeal} <br>
						</br><b>Recept:</b> ${recipe.strMeal} <br>
						<img src="${recipe.strMealThumb}" style="width: 300px; height: 300px"<br><br>`
					
					let favoritesBtn = document.createElement("button");
					favoritesBtn.innerText = "Add favorites";
					favoritesBtn.addEventListener("click", () => addFavorite(data));

					let removeFavoritesBtn = document.createElement("button");
					removeFavoritesBtn.innerText = "Remove favorites";
					removeFavoritesBtn.addEventListener("click", () => removeFavorite(data));

					recipeLi.appendChild(removeFavoritesBtn);
					recipeLi.appendChild(favoritesBtn);
					recipeUl.appendChild(recipeLi);
				})
			} else {
				recipeDiv.innerText=("Hittade inga recept som matchade din sökning")	
			}
		})
}

//Vänta med denna
function getCategories() {
	recipeUl.innerHTML = "";

	fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
		.then (res => res.json())
		.then ( data => {
			//Vänta med denna
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
	<b>Id:</b> ${data.meals[0].idMeal} <br>
	<b>Recept:</b> ${data.meals[0].strMeal}, <br> 
	<img src="${data.meals[0].strMealThumb}" style="width: 300px; height: 300px", <br><br>`;
	
	let favoritesBtn = document.createElement("button");
	favoritesBtn.innerText = "Add favorites";
	favoritesBtn.addEventListener("click", () => addFavorite(data));

	let removeFavoritesBtn = document.createElement("button");
	removeFavoritesBtn.innerText = "Remove favorites";
	removeFavoritesBtn.addEventListener("click", () => removeFavorite(data));

	recipeLi.appendChild(favoritesBtn);
	recipeLi.appendChild(removeFavoritesBtn);
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
