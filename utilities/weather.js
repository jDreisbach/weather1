const request=require('request');

const weather = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e0490fcab3663c2cefbc861e9203c9ac&query=' + latitude + ',' + longitude +'&units=f';
        request({url, json: true}, (error, {body})=>{
            if(error){
                callback('Unable to connect to weather services', undefined);
            }
            else if(body.error){
                callback('Unable to find location, Try Again', undefined);
            }
            else{
                callback(undefined, {
                    Weather: body.current.weather_descriptions[0],
                    Temperature: body.current.temperature,
                    Precip: body.current.precip,
                    realFeel: body.current.feelslike
                });
            };
        }
    
        
        )};
    
       

        module.exports = weather;