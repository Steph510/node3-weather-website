const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=70421ac8ad591a7a33eb4d7230badfad&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f'

    request({ url, json: true}, (error, {body}) => {

         if(error) {
            callback("Unable to connect to weather services", undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + ' degrees.' + 'Precipitation is at ' + body.current.precip +' percent.')
        }

    })//request

} //forecast

module.exports = forecast