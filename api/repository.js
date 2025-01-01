
/*if (process.env.NODE_ENV !== 'production') {
    console.log(process.env.NODE_ENV + ' sasas')
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
}*/

const Utils = require('./utils.js')

class Client {

    #axios;
    #dns;
    #username;
    #password;

    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            require('dotenv').config();
        }
        this.#axios = require('axios');
        this.#dns = process.env.DNS;
        this.#username = process.env.USER_NAME;
        this.#password = process.env.PASSWORD;
    }

    getAllMovies() {
        return this.#axios.get(
            Utils.getMoviesUrl(this.#dns, this.#username, this.#password)
        );
    }

    getAllChannels() {
        return this.#axios.get(
            Utils.getChannelsUrl(this.#dns, this.#username, this.#password)
        );
    }

    getStream(url) {
        return this.#axios.get(url, { responseType: 'stream' })
    }
}

module.exports = new Client();
//module.exports = { getAllMovies, getAllChannels, stream }