

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const axios = require('axios');
const dns = process.env.DNS;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

function getAllMovies() {
    const url = `${dns}player_api.php?username=${username}&password=${password}&action=get_vod_streams`;
    return axios.get(url);
}

function getAllChannels() {
    const url = `${dns}player_api.php?username=${username}&password=${password}&action=get_live_streams`;
    return axios.get(url);
}

function stream(url) {
    return axios.get(url, { responseType: 'stream' })
}

module.exports = { getAllMovies, getAllChannels, stream }