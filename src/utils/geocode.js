const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hpcmFnc2F2c2FuaSIsImEiOiJjazcwNDZrZWgwZmI2M2VtbDZuMmphcjZqIn0.yXJQC8Ml0ZLsqR3Y4Rs8_Q&limit=1'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to geocode service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try again with different search terms.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode