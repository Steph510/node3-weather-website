const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1Ijoic3RlcGhhbmllaHVsbCIsImEiOiJjazk2eDdzbGwweWZ0M2xvMXl1ZDUwOTJzIn0.BAcjxznkeD2iZZTFQzj6zA&limit=1'
       
    request({ url, json: true}, (error, {body}) => {

       

       if (error) {
           callback('Unable to connect to location services', undefined)
       } else if (body.features.length === 0) {
           callback('Unable to find location. Try another search.', undefined)
       } else {
           callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
           })

           
       }
   
       })//request
   
   }//geocode

   module.exports = geocode