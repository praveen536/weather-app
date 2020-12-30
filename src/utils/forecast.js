require('dotenv').config()
const request = require('request');
const weatherStackKey=process.env.weatherStackKey;
const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+weatherStackKey+'&query='+lattitude+','+longitude+'&units=m';
    request({url, json:true}, (err, {body})=>{
        if (err) {
            callback('Unable to connect to location services!',undefined);
        }else if (body.error) {
            callback('Unable to find location, Try another search.',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+body.current.temperature+ ' degress out, there is '+ body.current.precip+' % chance of rain.')
        }
    })
}

module.exports=forecast;