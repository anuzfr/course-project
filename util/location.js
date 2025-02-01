const axios = require('axios');
const HttpError = require('../models/http-error');
const API_KEY = '';



async function getCoordsForAddress (address) {
//     return {
//             lat:'25.2525252',
//             lng:'55.5555555'
//           }

    const response = await axios.get(`.......json?address${encodeURIComponent(address)}&keys${API_KEY}`);
    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('could not find location to the specified address' , 422)
        throw error
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;

}

module.exports = getCoordsForAddress;