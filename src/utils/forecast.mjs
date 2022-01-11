import request from "postman-request";

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c714a8e080e7be62b4f17c31cd86796d&query=${latitude},${longitude}&units=m`;

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Cannot connect to the Weather Services...');
        } else if (response.body.success == false) {
            callback('Please enter a valid location!');
        } else {
            const { timezone_id: zone, localtime } = response.body.location;
            const { weather_descriptions: weather, temperature, feelslike, precip } = response.body.current;

            // callback(undefined, `Location: ${response.body.location.name}, ${response.body.location.region}, ${response.body.location.country}`);
            
            // callback(undefined, response.body.current);
            
            callback(undefined,`${weather[0]}. Current temperature is ${temperature}° celcius. It feels like ${feelslike}. There is a ${precip}% chance of rain.
            (Timezone: ${zone} | Local Time: ${localtime})`);
        }
    });
}

export { forecast }