const request = require('request');

const geocode=(address, callback)=>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3ludGhldGlrMDIzIiwiYSI6ImNrYXlnenQ5NDBpenAydW9henBtNDBhbmwifQ._b5N7U3XcA253PC0Ynqpyg"  ;
    request({url, json: true}, (error, {body}={}) => {
         if (error){
             callback('unable to connect to location services...', undefined);
         } 
         else if (body.features.length===0){
             callback('unable to find location. Try another search', undefined);
         }
         else {
             callback(undefined, {
                 location:  body.features[0].place_name,
                 latitude:  body.features[0].center[1],
                 longitute: body.features[0].center[0]
                 
             });
         }
    });
 };
 


 module.exports = geocode;
 