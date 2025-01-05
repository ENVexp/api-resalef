/*class Token {
    #crypto;
    #algorithm;
    #password;
    #config;

    constructor() {
        this.#config = require('./config.js')
        this.#crypto = require('crypto');
        this.#algorithm = 'aes-128-cbc';
        this.#password = this.#crypto.createHash('md5')
            .update(this.#config.tokenPassword)
            .digest().subarray(0, 16);
    }

    create(dns, username, password) {
        console.log(dns)
        return this.#encrypt({
            dns,
            username,
            password
        })
    }

    decode(token) {
        return this.#decrypt(token);
    }

    #encrypt(object) {
        const cipher = this.#crypto.createCipheriv(
            this.#algorithm,
            this.#password,
            this.#password
        );
        let encrypted = cipher.update(JSON.stringify(object), 'utf-8', 'base64url');
        return encrypted += cipher.final('base64url');
    }

    #decrypt(encode) {
        const cipher = this.#crypto.createDecipheriv(
            this.#algorithm,
            this.#password,
            this.#password
        )
        let decrypt = cipher.update(encode, 'base64url', 'utf-8');
        return decrypt += cipher.final('utf-8');
    }
}

module.exports = new Token();*/

import config from './config.js';
import crypto from 'crypto';

class Token {
    #algorithm;
    #password;

    constructor() {
        this.#algorithm = 'aes-128-cbc';
        this.#password = crypto.createHash('md5')
            .update(config.tokenPassword)
            .digest().subarray(0, 16);
    }

    create(dns, username, password) {
        console.log(dns)
        return this.#encrypt({
            dns,
            username,
            password
        })
    }

    decode(token) {
        return this.#decrypt(token);
    }

    #encrypt(object) {
        const cipher = crypto.createCipheriv(
            this.#algorithm,
            this.#password,
            this.#password
        );
        let encrypted = cipher.update(JSON.stringify(object), 'utf-8', 'base64url');
        return encrypted += cipher.final('base64url');
    }

    #decrypt(encode) {
        const cipher = crypto.createDecipheriv(
            this.#algorithm,
            this.#password,
            this.#password
        )
        let decrypt = cipher.update(encode, 'base64url', 'utf-8');
        return decrypt += cipher.final('utf-8');
    }
}

export default new Token();

