import request from "postman-request";

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4e5d47405a2792672d57b46554cfcd5c&query=${latitude},${longitude}&units=m`;

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Cannot connect to the Weather Services...');
        } else if (response.body.success == false) {
            callback('Please enter a valid location!');
        } else {
            const { weather_descriptions: weather, temperature, feelslike, precip } = response.body.current;

            // callback(undefined, `Location: ${response.body.location.name}, ${response.body.location.region}, ${response.body.location.country}`);
            
            // callback(undefined, response.body.current);
            
            callback(undefined,`${weather[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike}. There is a ${precip}% chance of rain.`);
        }
    });
}

export { forecast }