const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'nishi hopkins'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'nishi hopkins'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'this is the help page!',
        name: 'nishi hopkins'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address required.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404!',
        errorMessage: 'Help article not found.',
        name: 'nishi hopkins'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404!',
        errorMessage: 'Page not found.',
        name: 'nishi hopkins'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}.`)
})