function main(){
  getBeerInstance()
  editDescription()
//   addReview()
}
const beerName = document.getElementById('beer-name')
const beerImage = document.getElementById('image')
const beerDescription = document.getElementById('beer-description')
const beerReviews = document.getElementById('review')
const beerForm = document.querySelector('.beer-details')
const reviewButton = document.getElementById('review-button')
const commentField = document.querySelector('#beer-description')


//fetching beer instance from server
function getBeerInstance(){
    fetch('http://localhost:3000/beers/1')
    .then(resp => resp.json())
    .then(beerData => injectBeerData(beerData))
}


//adding elements to the DOM
function injectBeerData(beerData){
    beerName.innerText = beerData.name
    beerImage.src = beerData.image_url
    beerDescription.innerText = beerData.description
    // iterate over reviews and post in li
    // beerReviews.innerHTML = beerData.reviews.map(review => `<li>${beerData.review}</li>`).join('')
    




}
//grab button
//grab adjacent form
//send PATCH request with payload to back
//fetch to display on DOM
function editDescription(){
    beerForm.addEventListener('click', function(e){
        const commentsField = e.target.previousElementSibling
        if(e.target.tagName === 'BUTTON'){
            const formData = {
                description: commentsField }
                
                
        const reqObj = {
        method: 'PATCH',
            headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
                
                fetch('http://localhost:3000/beers/1', reqObj)
                .then(resp => resp.json())
                .then(beer => commentsField.innerText = formData)
            }
        })
    }

//grab button
//add event listener to button
//grab adjacent form
//send POST request to back with payload
//fetch request
    // function addReview(){
    //     reviewButton.addEventListener('click', function(e){
    //         const reviewsField = e.target.previousElementSibling
    //         if(e.target.id === "review-button")
    //         const formData = {
    //             reviews: reviewsField
    //         }

    //         const reqObj = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type' : 'application/json'
    //             },
    //             body: JSON.stringify(reviewsField)
    //         }

    //         fetch('http://localhost:3000/beers/1')
    //         .then(resp => resp.json())
    //         .then(beer => {
    //             beer.reviews
    //         })

    //     })
    











main()