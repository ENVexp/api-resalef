import  axios  from 'axios';
const dns = process.env.DNS || 'http://chead.cc:80/';
const username = process.env.USER_NAME || 'Ronnyy';
const password = process.env.PASSWORD || 'root@2424';

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

export { getAllMovies, getAllChannels, stream }