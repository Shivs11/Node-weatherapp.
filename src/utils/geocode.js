const request = require('request');

const geocode = (address,callback) => {
    const url2 = 'http://api.weatherstack.com/current?access_key=2d7944100448dbf24f7ae2649c2ad4cf&query=' + address;
    //console.log(url2);
    request({url: url2, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to the net',undefined);
        }
        else if(body.message === "Not Found"){
            callback('Invalid location', response);
        }
        else{
           callback(undefined, {
               latitude: body.location.lat,
               longitude: body.location.lon,
           })
        }
    })
}


module.exports = geocode;