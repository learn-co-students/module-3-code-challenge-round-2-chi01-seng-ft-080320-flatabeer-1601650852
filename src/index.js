function main() {
fetchBeer()
editBeer()
addReview()
}

// See the first beer's details, 
// including its name, image, description, and reviews, when the page loads


function fetchBeer() {
    fetch('http://localhost:3000/beers/1')
    .then(resp => resp.json())
    .then(beer => {
        
        const beerDetails = document.querySelector('.beer-details')
        beerDetails.firstElementChild.innerText = `${beer.name}`
        
        const beerImg = document.querySelector('img')
        beerImg.src = `${beer.image_url}`

        const beerDescription = document.querySelector('.description')
        beerDescription.firstElementChild.innerText = `${beer.description}`
        
        const reviews = document.querySelector('.reviews')
        const reviewLi = beer.reviews.map(review => `<li> ${review} </li>`).join(' ')
        reviews.innerHTML = reviewLi
        
    })
}

// Change the beer's description and still see that change when reloading the page

    function editBeer() {
        const updateBtn = document.querySelector('button')
       
        updateBtn.addEventListener('click', function(e){
           const description = e.target.previousElementSibling.value

           const reqObj = {
               method: 'PATCH',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({description})
           }
            
           fetch('http://localhost:3000/beers/1', reqObj)
           .then(resp => resp.json())
           .then(comment => { 
               console.log(comment)
               addReview()
           })
        })
    }

    //Add a review for the beer (no persistence needed)
    function addReview() {
        
        const form = document.querySelector('.review-form')
        
        form.addEventListener('submit', function(e){
            e.preventDefault()
           const newReview = e.target.firstElementChild.value
            
           const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reviews: newReview})
        }
            
           fetch('http://localhost:3000/beers/1', reqObj)
           .then(resp => resp.json())
           .then(word => { 
                
                const newWord = word.reviews
               const reviewContainer = document.querySelector('.reviews')
               reviewContainer.innerHTML += newWord
                form.reset()
           })
               
        })
    }
//I modified the API by mistake and so map doesn't work
main()