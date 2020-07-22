const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Akiza'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Akiza'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Akiza'
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide address"
        })
    }

    geocode(req.query.address,(error,{latitude, longtitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
          })
    }) 
})                             

app.get('/help/*',(req,res) => {
    
    res.render('404',{
        title: '404',
        name: 'anja',
        error: 'Help article not found!'})
})
app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Akiza',
        error:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Service is up on port ' + port)
})