//variables
// const beerCard = document.querySelector('.beer-details')
const beerCardTitle = document.querySelector('h2')
const beerCardImage = document.querySelector('img')
const beerCardDescription = document.querySelector('form.description')
const beerCardReviews = document.querySelector('ul.reviews')
const beerCardReviewForm = document.querySelector('form.review-form')

//functions
function getBeerData(){
    fetch('http://localhost:3000/beers/2')
        .then( resp => resp.json() )
        .then(beerData => injectBeerData(beerData) )
        .catch(err => console.log(err))
}

function injectBeerData(beerData){
    beerCardTitle.innerText = beerData.name
    beerCardImage.src = beerData.image_url
    beerCardDescription[0].value = beerData.description
    beerCardReviews.innerHTML = concatLis(beerData.reviews)
}

function concatLis(reviewsArr){
    let liString = ""
    reviewsArr.forEach(review => {
        liString += `<li>${review}</li>`
    })
    return liString
}

function changeDescription(){
    event.preventDefault()
    const newDescription = event.target[0].value
    beerCardDescription.innerText = newDescription
    event.target.reset()

    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: newDescription
        })
    }
    fetch('http://localhost:3000/beers/2', reqObj)
        .then(resp => resp.json())
        .then(beer => console.log(beer))
        .catch(err => console.log(err))
}

function addReview(){
    event.preventDefault()
    const newReview = event.target[0].value
    const li = document.createElement('li')
    li.innerText = newReview
    beerCardReviews.append(li)
    event.target.reset()

    const patchObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newReview})
    }

    fetch('http://localhost:3000/beers/1', patchObj)
        .then(resp => resp.json() )
        .then(review => console.log(review))
        .catch(err => console.log(err))
}

//event listeners
beerCardDescription.addEventListener('submit', changeDescription)
beerCardReviewForm.addEventListener('submit', addReview)

//invoked functions
getBeerData()

