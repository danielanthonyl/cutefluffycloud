const request = require('request')

const geocode = (address, callback) => { 
    const url =  `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlzaGlob3BraW5zIiwiYSI6ImNrZHRnZXlwaTE5ZHUyeG15Y2UzZG42c2sifQ.bdIe1LPu430P9mzK2YF_ew&limit=1`

    request({ url, json: true }, (error, { body }) => { 
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else { 
            callback(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode