const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9fc09672e7e6f663d9145b361753d110/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
          
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. ' + 'The Type of Precipitation is ' +  body.daily.data[0].precipType  + '  and the visibility is ' +  body.daily.data[0].visibility + ' .')
        }
    })
}

module.exports = forecast