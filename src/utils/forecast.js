const request = require('request')

const forecast = (latitude, longitude, callback) => { 
    const url = `http://api.weatherstack.com/current?access_key=c2f80b6c7031f779be0153bdc2fc008d&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body }) => { 
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.error) {
            callback('Unable to find location!')
        } else { 
            callback(null,  `${body.current.weather_descriptions[0]}. Its currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees`)
        }
    })
}

module.exports = forecast