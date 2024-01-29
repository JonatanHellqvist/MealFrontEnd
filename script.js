let randomMealUl = document.getElementById("randomMealUl");

let randomBtn = document.getElementById("randomBtn");
randomBtn.addEventListener("click", () => {
	console.log("click på knapp")
	getRandomMeal();
});


function getRandomMeal() {
	randomMealUl.innerHTML = "";
	fetch("https://www.themealdb.com/api/json/v1/1/random.php")
		.then (res => res.json())
		.then (data => {
			console.log("meal id: ",(data.meals[0]).idMeal);
			
				let randomMealLi = document.createElement("li");

				randomMealLi.innerHTML = `<b>Måltid:</b> ${data.meals[0].strMeal}, <br> 
				<img src="${data.meals[0].strMealThumb}" style="width: 300px; height: 300px", <br><br>
				<b>Kategori:</b> ${data.meals[0].strCategory}, <br>
				<b>Instruktioner:</b> ${data.meals[0].strInstructions}`;
				
				randomMealUl.appendChild(randomMealLi);
		});
}

