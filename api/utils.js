/*function isHttps(url) {
    try {
        return new URL(url).protocol === 'https:';
    } catch (error) {
        return false;
    }
}

module.exports = {isHttps};*/
class Utils{
    static isHttps(url) {
        try {
            return new URL(url).protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    static getMoviesUrl(dns, username, password){
        return `${dns}player_api.php?username=${username}&password=${password}&action=get_vod_streams`;
    }

    static getChannelsUrl(dns, username, password){
        return `${dns}player_api.php?username=${username}&password=${password}&action=get_live_streams`;
    }
}

module.exports = Utils;