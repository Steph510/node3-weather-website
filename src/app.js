const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Steph Hull'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Steph Hull'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Click the weather icon to see the weather',
        title: 'Help',
        name: 'Steph Hull'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({

                forecast: forecastData,
                location: location,
                address: req.query.address
              
            })
        })
    })
   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: {}
    })
})



app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        errorMessage: "Help article not found",
        name: 'Steph Hull'
    })

})


app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        errorMessage: "Page not found",
        name: 'Steph Hull'
    })

})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})