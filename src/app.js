const path = require('path')
const express = require('express')
const exp = require('constants')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express()

const port = process.env.PORT || 3000

//To define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')

//To change directory, we can use below code, default dir is 'views' 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        creator: 'Chirag Savsani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        creator: 'Chirag Savsani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        creator: 'Chirag Savsani',
        message: 'We interact with Feeds every day. Social media and news are just a few examples of how information is presented and consumed in the modern age. Inside the CampusKnot feed, every class interaction is an opportunity for all students to build relationships and find their voice. See how other educators use our feed-driven tool to help students take an active role in their learning.'
    })
})

app.get('/weather', (req, res) => {

    const inputLocation = req.query.address
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(inputLocation, (error, { latitude, longitude, location } = {}) => {

        if (error) {
             return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            
            if (error) {
                return res.send({Error: error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: inputLocation
            })
        })
    })
})

app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search terms'
        })
    }
    res.send({
        product: []
    })
})

// app.get('/help/*', (req, res) => {
//     res.send('Help article not found...')
// })

// app.get('*', (req, res) => {
//     res.send('My 404 page...')
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        creator: 'Chirag Savsani',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        creator: 'Chirag Savsani',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// app.get(publicDirectoryPath+ '/help', (req, res) => {
//     res.send(
//         [
//             {
//                 name: 'Chirag',
//                 age: 31
//             }, {
//                 name: 'Trusha',
//                 age: 30
//             }
//         ]
//     )
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })