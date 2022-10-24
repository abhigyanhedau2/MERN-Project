const axios = require('axios');
const HttpError = require('../utils/http-error');

const API_KEY = 'AIzaSyDdW5wQ_Pa_SovW9VLLjpRotX24XIyiLRs';

const getCoordsForAddress = (address) => {

    return {
        lat: 40.7484474,
        lng: -73.9871516
    };

};

// const getCoordsForAddress = async (address) => {

//     // encodeURIComponent() - encodes everything in a URL ready format
//     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}+CA&key=${API_KEY}`);

//     const data = response.data;

//     if (!data || data.status === 'ZERO_RESULTS')
//         throw new HttpError(404, 'Could not find a location for specified address');

//     const coordinates = data.results[0].geometry.location;

//     return coordinates;
// };

module.exports = getCoordsForAddress;