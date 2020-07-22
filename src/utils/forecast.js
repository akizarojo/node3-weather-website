const request = require('postman-request')


const forecast = (latitude,longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1e6d402c19c7ee366eb246dd2c4ebf32&query=' + encodeURIComponent(longtitude) + ',' + encodeURIComponent(latitude) +'&units=s'
        console.log(url)
    request({url, json: true},(error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the internet',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{

                const temperature = body.current.temperature
                const feelsLike = body.current.feelslike
                const weather = body.current.weather_descriptions[0]
                const data = weather + ". It is currently " + temperature + " degress out. But it feels like " + feelsLike + " degress out, and it will going to be " + weather
                callback(undefined,data)
        }

    })
}

module.exports = forecast