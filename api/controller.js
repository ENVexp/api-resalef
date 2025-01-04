const Utils = require('./utils.js');


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

module.exports = new Controller();