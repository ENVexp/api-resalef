/*function isHttps(url) {
    try {
        return new URL(url).protocol === 'https:';
    } catch (error) {
        return false;
    }
}

module.exports = {isHttps};*/

/*class Utils{

    static #config = require('./config.js');

    static isHttps(url) {
        try {
            return new URL(url).protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    static urlMovies(dns, username, password){
        return `${dns}player_api.php?username=${username}&password=${password}&action=get_vod_streams`;
    }

    static getChannelsUrl(dns, username, password){
        return `${dns}player_api.php?username=${username}&password=${password}&action=get_live_streams`;
    }

    static getResourceUrl(hostname, url){
        return `${this.nativeUrl(hostname)}resource?url=${url}`
    }

    static getUserInfo(dns, username, password){
        return `${dns}/player_api.php?username=${username}&password=${password}`
    }

    static getLogin(hostname, dns, username, password){
        return `${this.nativeUrl(hostname)}`
    }

    static nativeUrl(hostname){
        if(hostname == 'localhost'){
            return `http://${hostname}:${this.#config.port + this.#config.baseUrl}`
        }
        return `https://${hostname + this.#config.baseUrl}`
    }
}

module.exports = Utils;*/

import config from './config.js';

class Utils{

    static isHttps(url) {
        try {
            return new URL(url).protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    static urlMovies(dns, username, password){
        return `${dns}player_api.php?username=${username}&password=${password}&action=get_vod_streams`;
    }

    static getChannelsUrl(dns, username, password){
        return `${dns}player_api.php?username=${username}&password=${password}&action=get_live_streams`;
    }

    static getResourceUrl(hostname, url){
        return `${this.nativeUrl(hostname)}resource?url=${url}`
    }

    static getUserInfo(dns, username, password){
        return `${dns}/player_api.php?username=${username}&password=${password}`
    }

    static getLogin(hostname, dns, username, password){
        return `${this.nativeUrl(hostname)}`
    }

    static nativeUrl(hostname){
        if(hostname == 'localhost'){
            return `http://${hostname}:${config.port + config.baseUrl}`
        }
        return `https://${hostname + config.baseUrl}`
    }
}

export default Utils;