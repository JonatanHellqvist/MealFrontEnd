let data;

let recipeDiv = document.getElementById("recipeDiv");
let recipeUl = document.getElementById("recipeUl");
let imgDiv = document.getElementById("imgDiv");
let recipeName = document.getElementById("recipeName");
let imgImg = document.getElementById("imgImg");
let messageDiv = document.createElement("messageDiv");

function addFavorite(data) {
	const mealId = data.meals ? data.meals[0].idMeal : data.idMeal;
	const mealName = data.meals ? data.meals[0].strMeal : data.strMeal;

	fetch('http://localhost:8080/meal', {
		
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({
			id : mealId,
			name : mealName,
			comment : null
		})
	})
		.then(() =>{
			printFavorites();
			console.log("add to favorites: ", mealId, " ", mealName);
		})	
}

function removeFavorite(data) {
	
	const removeId = (data.meals[0].idMeal);

	fetch (`http://localhost:8080/meal?id=${removeId}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(() =>{
			printFavorites();
			console.log("remove from favorites: ", data.meals[0].idMeal, " ", data.meals[0].strMeal);
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

// recipeinfo
let recipeInfoBtn = document.createElement("button");
	recipeInfoBtn.setAttribute("id","recipeInfoBtn");
	recipeInfoBtn.innerText = "Recipe Info";
	recipeInfoBtn.addEventListener("click", () => {
		recipeUl.innerHTML = "";
		printRecipeInfo(data);
	});

// let favoritesBtn = document.createElement("button");
// 	favoritesBtn.innerText = "Add favorites";
// 	favoritesBtn.addEventListener("click", () => addFavorite(data));

function searchRecipe(inputValue) {
	recipeUl.innerHTML = "";
	recipeDiv.innerHTML = `
			<div id="messageDiv">
			<p>Search Results for: ${inputValue}<p>
			</div>`;

	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
		.then(res => res.json())
		.then(datas =>  {
			
			if (datas.meals !== null) {
		
				recipeDiv.appendChild(recipeUl);		
				datas.meals.forEach(data => {

					let recipeLi = document.createElement("li");
					recipeLi.setAttribute("id", "recipeLi");
					recipeLi.innerHTML = `
						<div id="recipeNameDiv">		
							<h1 id="recipeName">${data.strMeal}</h1> 	
						</div>
						<div id="imgDiv">
							<img id="imgImg" src="${data.strMealThumb}">
						</div>
						`;
					
					let favoritesBtn = document.createElement("button");
					favoritesBtn.innerText = "Add favorites";
					favoritesBtn.addEventListener("click", () => addFavorite(data));
			
					let recipeInfoBtn = document.createElement("button");
					recipeInfoBtn.setAttribute("id","recipeInfoBtn");
					recipeInfoBtn.innerText = "Recipe Info";

					recipeInfoBtn.addEventListener("click", () => printRecipeInfo(data)
					);

					let buttonsDiv = document.createElement("div");
					buttonsDiv.setAttribute("id","buttonsDiv");
					buttonsDiv.appendChild(favoritesBtn);
					buttonsDiv.appendChild(recipeInfoBtn);


					recipeLi.appendChild(buttonsDiv);
					recipeUl.appendChild(recipeLi);
				});
			} else {
				recipeDiv.innerText=("Hittade inga recept som matchade din sökning")	
			}
		});
}


function printCategories() {
	recipeUl.innerHTML = "";
	recipeDiv.innerHTML = `
			<div id="messageDiv">
			<p>Kategorier<p>
			</div>`;

	fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
		.then (res => res.json())
		.then (data => {
			data.categories.forEach(category => {

				let categoryLi = document.createElement("li");
				categoryLi.setAttribute("id","categoryLi");
				categoryLi.innerHTML = `
					<div id="recipeNameDiv">		
						<h1 id="recipeName">${category.strCategory}</h1> 	
					</div>
					<div id="imgDiv">
						<img id="imgImg" src="${category.strCategoryThumb}">
						</div>
					`;

				let printCategoryBtn = document.createElement("button");
				printCategoryBtn.innerText = "Show Category";

				let categoryButtonsDiv = document.createElement("div");
				categoryButtonsDiv.setAttribute("id","categorybuttonsDiv");
				categoryButtonsDiv.appendChild(printCategoryBtn);
				

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
								recipeLi.setAttribute("id", "recipeLi");
								recipeLi.innerHTML = `
									<div id="recipeNameDiv">		
										<h1 id="recipeName">${data.meals[0].strMeal}</h1> 	
									</div>
									<div id="imgDiv">
										<img id="imgImg" src="${data.meals[0].strMealThumb}">
									</div>
									`;

								let favoritesBtn = document.createElement("button");
								favoritesBtn.innerText = "Add favorites";
								favoritesBtn.addEventListener("click", () => addFavorite(data));

								let recipeInfoBtn = document.createElement("button");
								recipeInfoBtn.setAttribute("id","recipeInfoBtn");
								recipeInfoBtn.innerText = "Recipe Info";
								recipeInfoBtn.addEventListener("click", () => {
									recipeUl.innerHTML = "";
									console.log(data)
									printRecipeInfo(data);
								});

								let buttonsDiv = document.createElement("div");
								buttonsDiv.setAttribute("id","buttonsDiv");
								buttonsDiv.appendChild(favoritesBtn);
								buttonsDiv.appendChild(recipeInfoBtn);

								recipeLi.appendChild(buttonsDiv);
								recipeUl.appendChild(recipeLi);
			
							})	
						});
					})
				})
				categoryLi.appendChild(categoryButtonsDiv);
				recipeUl.appendChild(categoryLi);
				recipeDiv.appendChild(recipeUl);	
			});	
	});
}

function printByCategory() {

}

function printById() {

}

function getRandomMeal() {
	recipeUl.innerHTML = "";
	recipeDiv.innerHTML = `
			<div id="messageDiv">
			<p>Random Recept<p>
			</div>`;
	
	fetch("https://www.themealdb.com/api/json/v1/1/random.php")
		.then (res => res.json())
		.then (responsedata => {
			data=responsedata;
			printRecipe(data)
		});		
}

function printFavorites() {
	recipeUl.innerHTML = "";
	recipeDiv.innerHTML = `
			<div id="messageDiv">
			<p>Dina sparade Recept:<p>
			</div>`;	
	
	fetch(`http://localhost:8080/meals`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			data.forEach(recipe => {
				fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.id}`)
					.then(res => res.json())
					.then(data => {
					
						let favoritesLi = document.createElement("li");
						favoritesLi.setAttribute("id", "favoritesLi");
						favoritesLi.innerHTML = `
							<div id="recipeNameDiv">		
								<h1 id="recipeName">${data.meals[0].strMeal}</h1> 	</div>
							<div id="imgDiv">
								<img id="imgImg" src="${data.meals[0].strMealThumb}">
							</div>
							`;
							
					let recipeCommentDiv = document.createElement("div");
					recipeCommentDiv.setAttribute("id", "recipeCommentDiv");

					let recipeCommentH1 = document.createElement("h1");
					recipeCommentH1.setAttribute("id","recipeCommentH1");
					recipeCommentH1.innerText = "Comment";
					
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

					let recipeInfoBtn = document.createElement("button");
					recipeInfoBtn.setAttribute("id","recipeInfoBtn");
					recipeInfoBtn.innerText = "Recipe Info";
					recipeInfoBtn.addEventListener("click", () => {
						recipeUl.innerHTML = "";
						console.log(data)
						printRecipeInfo(data);
					});

					
					let favoritesButtonsDiv = document.createElement("div");
					favoritesButtonsDiv.setAttribute("id","favoritesButtonsDiv");
					favoritesButtonsDiv.appendChild(removeFavoritesBtn);
					favoritesButtonsDiv.appendChild(editRecipeComment);
					favoritesButtonsDiv.appendChild(recipeInfoBtn);
					
					// recipeCommentDiv.appendChild(editRecipeComment);
					favoritesLi.appendChild(recipeCommentDiv);
					favoritesLi.appendChild(favoritesButtonsDiv);
					recipeCommentDiv.appendChild(recipeCommentH1);
					recipeCommentDiv.appendChild(recipeComment);
					recipeUl.appendChild(favoritesLi);
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
	// recipeDiv.innerHTML = "";

	let recipeLi = document.createElement("li");
	recipeLi.setAttribute("id", "recipeLi");
	recipeLi.innerHTML = `
		<div id="recipeNameDiv">		
			<h1 id="recipeName">${data.meals[0].strMeal}</h1> 	
		</div>
		<div id="imgDiv">
			<img id="imgImg" src="${data.meals[0].strMealThumb}">
		</div>
		`;
		
	let favoritesBtn = document.createElement("button");
	favoritesBtn.setAttribute("id","favoritesBtn");
	favoritesBtn.innerText = "Add favorites";
	favoritesBtn.addEventListener("click", () => addFavorite(data));

	let buttonsDiv = document.createElement("div");
	buttonsDiv.setAttribute("id","buttonsDiv");
	buttonsDiv.appendChild(favoritesBtn);
	buttonsDiv.appendChild(recipeInfoBtn);

	recipeLi.appendChild(buttonsDiv);
	// recipeLi.appendChild(recipeInfoBtn);
	recipeUl.appendChild(recipeLi);
	recipeDiv.appendChild(recipeUl);
	
}

/////////DETALJSIDAN/////////

function printRecipeInfo(data) {
	recipeDiv.innerHTML = `
			<div id="messageDiv">
			<p>Receptinformation<p>
			</div>`;

	fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.meals[0].idMeal}`)
		.then(res => res.json())
		.then(data => {
		console.log(data.meals[0].idMeal)
								
		let recipeInfoLi = document.createElement("div");
		recipeInfoLi.setAttribute("id", "recipeInfoLi");
		recipeInfoLi.innerHTML = `
			
				<div id="recipeInfoNameDiv">		
					<h1 id="recipeInfoName">${data.meals[0].strMeal}</h1> 	
				</div>
				<div id=recipeInfoInfo>
					<div id="recipeInfoIngredients">
						<ul>
							<h1>Ingredienser</h1>
							${ingredientList(data.meals[0])}
						</ul>
					</div>
					<div id="imgInfoDiv">
						<img id="imgInfoImg" src="${data.meals[0].strMealThumb}">
					</div>
					<div id="recipeInfoMeasures">
						<ul>
							<h1>Mått</h1>
							${measurementList(data.meals[0])}
						</ul>
					</div>
				</div>
				<!-- >><div id="recipeInfoCategory">
					<h1>Kategori: </h1> ${data.meals[0].strCategory}<br>
					<h1>Ursprung: </h1> <br>
				</div> -->
				<div id="recipeInfoInstructions">
					<h1>Instruktioner: </h1>${data.meals[0].strInstructions} 
				</div>				
			`;

			let favoritesBtn = document.createElement("button");
			favoritesBtn.innerText = "Add favorites";
			favoritesBtn.addEventListener("click", () => addFavorite(data));

			let infoButtonsDiv = document.createElement("div");
			infoButtonsDiv.setAttribute("id","infoButtonsDiv");
			infoButtonsDiv.appendChild(favoritesBtn);
									
			recipeInfoLi.appendChild(infoButtonsDiv);
			recipeUl.appendChild(recipeInfoLi);
			recipeDiv.appendChild(recipeUl);

			})	
};

function ingredientList(meal) {

	let ingredientsList = "";
	
	for  (let i = 1; i <= 20; i++) {
		let ingredient = meal[`strIngredient${i}`];
		if(ingredient) {
			ingredientsList += `<li>${ingredient}</li>`
		}
	}
	return ingredientsList
}

function measurementList(meal) {
	let measureList = "";
	
	for  (let i = 1; i <= 20; i++) {
		let measure = meal[`strMeasure${i}`];
		if(measure) {
			measureList += `<li>${measure}</li>`
		}
	}
	return measureList
}