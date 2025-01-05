/*const Utils = require('./utils.js')

class Client {

    #axios;
    #config;

    constructor() {
        this.#axios = require('axios');
        this.#config = require('./config.js');
        this.urls = {
            movies(token){
                return `${token.dns}/player_api.php?username=${token.username}&password=${token.password}&action=get_vod_streams`;
            },
            userInfo(dns, username, password){
                return `${dns}/player_api.php?username=${username}&password=${password}`;
            },
            resource:(hostname, url, tokenValue)=>{
                if(hostname == 'localhost') hostname = `${hostname}:${this.#config.port}`;
                return `https://${hostname + this.#config.baseUrl}/resource?url=${url}&token=${tokenValue}`
            }
        }
    }

    getAllMovies(token) {
        return this.#axios.get(this.urls.movies(token));
    }

    getUserInfo(dns, username, password){
        return this.#axios.get(this.urls.userInfo(dns, username, password))
    }

    getStream(url) {
        return this.#axios.get(url, { responseType: 'stream' })
    }
}

module.exports = new Client();*/


import axios from 'axios';
import config from './config.js';

class Client {

    constructor() {
        this.urls = {
            movies(token){
                return `${token.dns}/player_api.php?username=${token.username}&password=${token.password}&action=get_vod_streams`;
            },
            urlCategoryMovies(dns, username, password){
                return `${dns}player_api.php?username=${username}&password=${password}&action=get_vod_categories`;
            },
            urlCategoryChannels(dns, username, password){
                return `${dns}player_api.php?username=${username}&password=${password}&action=get_live_categories`;
            },
            urlCategorySeries(dns, username, password){
                return `${dns}player_api.php?username=${username}&password=${password}&action=get_series_categories`;
            },
            userInfo(dns, username, password){
                return `${dns}/player_api.php?username=${username}&password=${password}`;
            },
            resource:(hostname, url, tokenValue)=>{
                if(hostname == 'localhost') hostname = `${hostname}:${config.port}`;
                return `https://${hostname + config.baseUrl}/resource?url=${url}&token=${tokenValue}`
            }
        }
    }

    getSeriesCategory(token){
        return axios.get(this.urls.urlCategorySeries(token.dns, token.username, token.password));
    }

    getChannelsCategory(token){
        return axios.get(this.urls.urlCategoryChannels(token.dns, token.username, token.password));
    }

    getMoviesCategory(token){
        return axios.get(this.urls.urlCategoryMovies(token.dns, token.username, token.password));
    }

    getAllMovies(token) {
        return axios.get(this.urls.movies(token));
    }

    getUserInfo(dns, username, password){
        return axios.get(this.urls.userInfo(dns, username, password))
    }

    getStream(url) {
        return axios.get(url, { responseType: 'stream' })
    }
}

export default new Client();