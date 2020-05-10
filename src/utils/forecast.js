const request = require('request')


const forecast = (latitude, longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2d7944100448dbf24f7ae2649c2ad4cf&query=' + latitude + ',' + longitude;
    console.log(url);
    request({url: url, json: true}, (error,response) => {
        if(error){
            callback('Unable to connect to the net', undefined);
        }
        else if(response.body.location.name === null && response.body.location.country === null){
            callback('Invalid coordinates!', undefined);
        }
        else{
            callback(undefined, {
                place: response.body.location.name,
                temperature: response.body.current.temperature,
                description: response.body.current.weather_descriptions[0],
            })
        }
    })
}


module.exports = forecast;