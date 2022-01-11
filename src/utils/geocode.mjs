import request from "postman-request";

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3NpdGUiLCJhIjoiY2t5MmxnaWplMG1xejJwbGd0Z3Vrb2ltaSJ9.6pCdgYHEA9kxx-_5wfLU4w&limit=1`;

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Cannot connect to the Weather Services...');
        } else if (response.body.features.length === 0) {
            callback('Please enter a valid location!');
        } else {

            const { center, place_name } = response.body.features[0];

            callback(undefined, {
                Latitude: center[1],
                Longitude: center[0],
                Location: place_name
            });
        }
    });
}

export { geocode }