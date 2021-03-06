const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { //Hear e means event
    e.preventDefault()
    const location = search.value
    
    message1.textContent = 'Loading....'
    message2.textContent = ''
    //const url = 'http://localhost:3000/weather?address=' + location
    const url = '/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                console.log(data.error)
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})