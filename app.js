const loadFood = keyword => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodList(data.meals))
        .then(error => console.log(error))
}

const displayFoodList = (foods) => {
    const foodLisContainer = document.getElementById("food-list");
    foodLisContainer.innerHTML = ""
    foods.forEach(food => {

        const foodDiv = document.createElement("div");
        foodDiv.classList.add("col");
        console.log(food);
        foodDiv.innerHTML = `
                   <div class="card shadow-lg border-0 bg-dark">
                            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title text-white text-center my-2">${food.strMeal} <span class="text-info"> (${food.strArea})</span></h5>
                                 
                                
                                </div>

                            <button type="button" class="btn btn-warning mx-5 mb-4 fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="loadDetails(${food.idMeal})">
                                See More Details
                            </button>
                    </div>
        `;
        foodLisContainer.appendChild(foodDiv);
    });

}

document.getElementById("searchbtn").addEventListener("click", () => {
    const searchKey = document.getElementById("search-box").value;

    loadFood(searchKey);
    document.getElementById("search-box").value = "";
})



const loadDetails = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodDetails(data.meals[0]))
}

const displayFoodDetails = details => {
    const detailsContainer = document.getElementById("food-details");
    const linkyt = details.strYoutube.split("=")

    detailsContainer.innerHTML = `
<iframe width="100%" height="350px" src="https://www.youtube.com/embed/${linkyt[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        Category: <a class="btn btn-outline-success" href="#"> ${details.strCategory}</a>          
<h4 class="my-2">${details.strMeal}</h4>
                        <p class="my-2">${details.strInstructions}</p>
                        
    `

}
loadFood("");
