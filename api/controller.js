/*const Utils = require('./utils.js');


class Controller {
    #router;
    #service;
    constructor() {
        this.#router = require('express').Router();
        this.#service = require('./service.js');
        this.init();
    }

    init() {
        this.#get('/movies', this.#service.listMovies);
        this.#get('/resource', this.#service.loadResource);
        this.#get('/userinfo', this.#service.userInfo);
        this.#get('/login', this.#service.login);
        this.#get('/routers', (req, res) => {
            const list = this.#router.stack.map(route => {
                const methods = Object.keys(route.route.methods).join(' ').toUpperCase();
                const path = route.route.path;
                let description = '';
                switch (path) {
                    case '/movies':
                        description = 'Listar todos os filmes';
                        break;
                    case '/login':
                        description = 'Obtem o token para usar os outros endpoints';
                        break;
                }
                return {
                    url: Utils.nativeUrl(req.hostname) + route.route.path,
                    methods,
                    description
                }
            });
            res.json(list);
        })
    }

    getRouter() {
        return this.#router;
    }

    inRouter(path) {
        this.#router.stack.forEach(p => {
            console.log(p.route)
            if (p.route.path == path) return true;
        });
        return false;
    }

    #get(path, action) {
        this.#router.get(path, (req, res) => action(req, res))
    }
}

module.exports = new Controller();*/


import Utils from './utils.js';
import express from 'express';
import service from './service.js';


class Controller {
    #router;
    constructor() {
        this.#router = express.Router()
        this.init();
    }

    init() {
        this.#get('/generateToken', service.token)
        this.#get('/docs', service.docs)
        this.#get('/video', service.videoPlayer)
        this.#get('/movies', service.listMovies);
        this.#get('/series', service.listSeries);
        this.#get('/series/details', service.serieDetails);
        this.#get('/channels', service.listChannels);
        this.#get('/movies/category', service.listMoviesCategory)
        this.#get('/channels/category', service.listChannelsCategory)
        this.#get('/series/category', service.listSeriesCategory)
        this.#get('/player', service.player);
        this.#get('/resource', service.loadResource);
        this.#get('/userinfo', service.userInfo);
        this.#get('/login', service.login);
        this.#get('/routers', (req, res) => {
            const list = this.#router.stack.map(route => {
                const methods = Object.keys(route.route.methods).join(' ').toUpperCase();
                const path = route.route.path;
                let description = '';
                switch (path) {
                    case '/movies':
                        description = 'Listar todos os filmes';
                        break;
                    case '/login':
                        description = 'Obtem o token para usar os outros endpoints';
                        break;
                }
                return {
                    url: Utils.nativeUrl(req.hostname) + route.route.path,
                    methods,
                    description
                }
            });
            res.json(list);
        })
    }

    getRouter() {
        return this.#router;
    }

    inRouter(path) {
        this.#router.stack.forEach(p => {
            console.log(p.route)
            if (p.route.path == path) return true;
        });
        return false;
    }

    #get(path, action) {
        this.#router.get(path, (req, res) => action(req, res))
    }
}

export default new Controller();