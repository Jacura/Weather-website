 

//use of FETCH API

//fetch('http://puzzle.mead.io/puzzle').then((response)=>{
  // response.json().then((data)=>{
  //     console.log(data);
   //})
//})
 

//1.setup a call to fetch wether from rohtak
//2.get the parse json response 
//  - if error proprty ,print error  
//  - if no error proprty,print locationa and forecast
//3. refresh browser and test ur work
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
           // console.log(data.location);
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

 