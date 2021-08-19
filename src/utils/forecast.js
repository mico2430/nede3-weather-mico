const request = require('request')

const forecast = (longitude, latitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=f64c6cffe5c3795950aff3d83e5a78fb&query=' + latitude + ',' + longitude + '&units=F'
    
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable weather service', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ' it`s currently ' + body.current.temperature + ' degree out, It feels like ' + body.current.feelslike + ' degree out.')
        }
    })

}

module.exports = forecast