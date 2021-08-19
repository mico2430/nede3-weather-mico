const path = require('path')
const { request } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

// setUP handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!!!!',
        name:   'Mico Corcuera'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About!!!!',
        name:   'Mico Corcuera'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!!!!',
        name:   'Mico Corcuera'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'Snowing',
    //     location: 'Philippines',
    //     address: req.query.address 
    // })
})

app.get('/product', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must be provide search tern'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Mico Corcuera',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name:   'Mico Corcuera',
        errorMessage: 'Page not found'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up ' + port)
})