let randomMealUl = document.getElementById("randomMealUl");

//randomknapp
let randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {
	recipesDiv.innerHTML = "";
	console.log("click på knapp");
	getRandomMeal();
});

//searchknapp
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", ()=>{
	let inputValue = document.getElementById("searchInput").value.trim();
	
	if (inputValue !== "") {
		searchRecipe(inputValue);
	}
	else {
		recipesDiv.innerText=("Fyll i sökfältet för att söka")
	}
	console.log("click på knapp");
	
})


// document.getElementById("searchBtn").addEventListener("click",()=>{
// 	let inputValue = document.getElementById("searchInput").value


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
		.then (data => {
			console.log("meal id: ",(data.meals[0]).idMeal);
			
				let randomMealLi = document.createElement("li");

				randomMealLi.innerHTML = `<b>Recept:</b> ${data.meals[0].strMeal}, <br> 
				<img src="${data.meals[0].strMealThumb}" style="width: 300px; height: 300px", <br><br>
				<b>Kategori:</b> ${data.meals[0].strCategory}, <br>
				<b>Instruktioner:</b> ${data.meals[0].strInstructions}`;
				
				recipesDiv.appendChild(randomMealUl);
				randomMealUl.appendChild(randomMealLi);
		});
}






// FUnkar

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
