const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ca934cfa02a3bc42764bd2fb462b168d&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degree out. It is feels like " + body.current.feelslike + " degree out")
        }
    })
}

module.exports = forecast

// {
//     description: response.body.current.weather_descriptions[0],
//     temperature: response.body.current.temperature,
//     feelslike: response.body.current.feelslike
// },
