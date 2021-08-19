const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWljb2VkbWVyMTQzIiwiYSI6ImNrc2cxempwejFnZmoydXM2dm9scnRyZGoifQ.6LWjTIzubw6rELgmsN7Vpg'
        
    request({ url, json: true}, (error, { body }) => {
        
        if (error){
             callback('Unable to connect to location services', undefined)
        }
        else if( body.features.length === 0){
            callback('Unable to find server. try to search another', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode