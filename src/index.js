// Code here

const beerDetail = document.querySelector(".beer-details")


function getBeerData(){
    fetch("http://localhost:3000/beers/1")
    .then(resp => resp.json())
    .then(beerData => appendBeerToScreen(beerData))
    .catch(err => console.log(err))
}    

function appendBeerToScreen(beerData){
    beerDetail.innerHTML = 
    `<div class="beer-details">
    <h2>${beerData.name}</h2>
    <img src=${beerData.image_url}">

    <form class="description">
    <textarea>${beerData.description}</textarea>
      <button>Update Beer</button>
    </form>

    <h3>Leave a Review</h3>
    <form class="review-form">
    <textarea></textarea>
    <input type="submit" value="Submit">
    </form>
    
    <h3>Customer Reviews</h3>
    <ul class="reviews">
    ${createReviewsLis(beerData.reviews)}
    </ul>
    </div>`
    beerDetail.addEventListener("click", editDescriptionHandler)
}
function createReviewsLis(reviewArr){
    let liString = ""
    reviewArr.forEach(review => liString += `<li>${review}</li>`)
    return liString
}

function editDescriptionHandler(){
    if (event.target.innerText === "UPDATE BEER"){
        editDescription(event.target)
        }
}

function editDescription(){
    const newDescription = event.target.innerText
    const patchObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({newDescription})
    }
    
    fetch(`http://localhost:3000/beers/[:id]`, patchObj)
    .then(resp => resp.json())
    .then(beerData => console.log(beerData))
    .catch(err => console.log(err))
}


getBeerData()