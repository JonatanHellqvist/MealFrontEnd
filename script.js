//måste gå att fixa favoriter på något vettigare sätt men fungerar för tillfället
//går det lösa utan att lyfta ut den

let data;

let recipeDiv = document.getElementById("recipeDiv");
let recipeUl = document.getElementById("recipeUl");

function addFavorite(data) {

	fetch('http://localhost:8080/meal', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({
			id : data.meals[0].idMeal,
			name : data.meals[0].strMeal,
			comment : null
		})
	})
		.then(() =>{
			recipeDiv.innerHTML = `
			<p>Added <b>Id:</b> ${data.meals[0].idMeal}<b>Recept:</b> ${data.meals[0].strMeal} to favorites<p>`;
			printFavorites();

			console.log("add to favorites: ", data.meals[0].idMeal);
		})	
}

//funkar men hittar inte om det inte finns
function removeFavorite(data) {
	console.log("remove from favorites: ", data.meals[0].idMeal);
	const removeId = (data.meals[0].idMeal);

	fetch (`http://localhost:8080/meal?id=${removeId}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(() =>{
			recipeDiv.innerHTML = `<p>Removed <b>Id:</b> ${data.meals[0].idMeal} <b>Recept:</b> ${data.meals[0].strMeal} from favorites<p>`;	
			printFavorites();
		});
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
	// localStorage.getItem("favoriteslist", JSON.stringify(favoriteRecipes));
	printFavorites();
})
let categoryBtn = document.getElementById("categoryBtn")
categoryBtn.addEventListener("click", () => {
	printCategories();
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

					recipeLi.appendChild(favoritesBtn);
					recipeUl.appendChild(recipeLi);
				});
			} else {
				recipeDiv.innerText=("Hittade inga recept som matchade din sökning")	
			}
		});
}


function printCategories() {
	recipeUl.innerHTML = "";

	fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
		.then (res => res.json())
		.then (data => {
			data.categories.forEach(category => {

				let categoryLi = document.createElement("li");
				categoryLi.innerHTML = `
				<b>Id:</b> ${category.idCategory} <br>
				</br><b>Kategori:</b> ${category.strCategory} <br>
				<img src="${category.strCategoryThumb}" style="width: 200px; height: 200px"<br><br>`

				let printCategoryBtn = document.createElement("button");
				printCategoryBtn.innerText = "Show Category";

				printCategoryBtn.addEventListener("click", () => {
					recipeUl.innerHTML = "";
					fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
					.then(res => res.json())
					.then(data => {
						console.log(data);

						data.meals.forEach(meal => {
							console.log(category.strCategory);
							fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
							.then(res => res.json())
							.then(data => {
								console.log(meal.idMeal)
								
								let recipeLi = document.createElement("li");
								recipeLi.innerHTML = 
								`<b>Id:</b> ${meal.idMeal} <br>
								</br><b>Recept:</b> ${meal.strMeal} <br>
								<img src="${meal.strMealThumb}" style="width: 300px; height: 300px"<br><br>`

								let favoritesBtn = document.createElement("button");
								favoritesBtn.innerText = "Add favorites";
								favoritesBtn.addEventListener("click", () => addFavorite(data));

								recipeLi.appendChild(favoritesBtn);
								recipeUl.appendChild(recipeLi);
							})	
						});
					})
				})
				categoryLi.appendChild(printCategoryBtn);
				recipeUl.appendChild(categoryLi);
				
			});	
	});
}

function printByCategory() {

}

function printById() {

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

function printFavorites() {
	recipeUl.innerHTML = "";
	
	fetch(`http://localhost:8080/meals`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			data.forEach(recipe => {
				fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.id}`)
					.then(res => res.json())
					.then(data => {
					
					let recipeLi = document.createElement("li");
					recipeLi.innerHTML = `
					<b>Id:</b> ${data.meals[0].idMeal} <br>
					<b>Recept:</b> ${data.meals[0].strMeal}, <br> 
					<img src="${data.meals[0].strMealThumb}" style="width: 300px; height: 300px", <br><br>`;

					let recipeCommentDiv = document.createElement("div");
					recipeCommentDiv.setAttribute("id", "recipeCommentDiv");
					
					let recipeComment = document.createElement("p");
					recipeComment.setAttribute("id", "recipeComment");
					
						if (recipe.comment !== null) {
							recipeComment.innerText = recipe.comment;
						} else {
							recipeComment.innerText = "Write a comment here.."
						}
					
					let editRecipeComment = document.createElement("button");
					editRecipeComment.innerText = "Edit comment";
					editRecipeComment.addEventListener("click", () => editComment(recipe.id, recipe.comment));
					
					let removeFavoritesBtn = document.createElement("button");
					removeFavoritesBtn.innerText = "Remove favorite";
					removeFavoritesBtn.addEventListener("click", () => removeFavorite(data));

					recipeLi.appendChild(removeFavoritesBtn);
					recipeCommentDiv.appendChild(editRecipeComment);
					recipeLi.appendChild(recipeCommentDiv);
					recipeCommentDiv.appendChild(recipeComment);
					recipeUl.appendChild(recipeLi);
					recipeDiv.appendChild(recipeUl);
					})
			})	
		});
}

function editComment(recipeId,comment) {

	let newComment = prompt ("Edit comment: ", comment)
	fetch(`http://localhost:8080/meal/editcomment?id=${recipeId}&comment=${newComment}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json' 
		}
	})
	.then(data => {
		printFavorites();
		console.log(data)
	});

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

	recipeLi.appendChild(favoritesBtn);
	recipeUl.appendChild(recipeLi);
	recipeDiv.appendChild(recipeUl);
	
}




//local storage 

// function addFavorite(data) {
// 	console.log("add to favorites: ", data.meals[0].idMeal);
// 	favoriteRecipes.push(data.meals[0].idMeal);
// 	localStorage.setItem("favoriteslist", JSON.stringify(favoriteRecipes));

// 	// const addmessage = `<p>Added ${data.meals[0].idMeal} to favorites<p>`
// 	recipeDiv.innerHTML = `<p>Added <b>Id:</b> ${data.meals[0].idMeal} <b>Recept:</b> ${data.meals[0].strMeal} to favorites<p>`;
// }

//local storage varianten: 

// function removeFavorite(data) {
// 	console.log("remove from favorites: ", data.meals[0].idMeal);
// 	const removeId = favoriteRecipes.indexOf(data.meals[0].idMeal);

// 	if(removeId != -1) {
// 	// favoriteRecipes.splice(favoriteRecipes.indexOf(data.meals[0].idMeal),1);
// 	favoriteRecipes.splice(removeId,1)
// 	localStorage.setItem("favoriteslist", JSON.stringify(favoriteRecipes));

// 	recipeDiv.innerHTML = `<p>Removed <b>Id:</b> ${data.meals[0].idMeal} <b>Recept:</b> ${data.meals[0].strMeal} from favorites<p>`;
// 	}else {
// 		console.log("inte i favorites")
// 	}
// }

// function showFavorites() {
// 	recipeUl.innerHTML = "";

// 	favoriteRecipes.forEach(idMeal => {
// 		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
//             .then(res => res.json())
//             .then(data => {
				
// 				printRecipe(data);
// 			})
// 	})

// 	console.log(favoriteRecipes)
// }

// let favoriteRecipes = JSON.parse(localStorage.getItem("favoriteslist")) || [];