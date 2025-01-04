class Config {
    static #instance
    constructor(){
        if (process.env.NODE_ENV !== 'production') {
            require('dotenv').config();
        }
        this.baseUrl = '/easyapp/api';
        this.port = process.env.PORT;
        this.tokenPassword = process.env.TOKEN_PASSWORD;
        this.defaultDNS = process.env.DEFAULT_DNS;
        this.serviceOn = process.env.SERVICE_ON;
    }

    static getInstance(){
        if(!Config.#instance){
            Config.#instance = new Config();
        }
        return Config.#instance;
    }
}

module.exports = new Config();