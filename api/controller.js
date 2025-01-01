class Controller{
    #router;
    #service;
    constructor(){
        this.#router = require('express').Router();
        this.#service = require('./service.js');
        this.init();
    }

    init(){
        this.#router.get('/movies', (req, res)=> this.#service.listMovies(req, res));
    }

    getRouter(){
        return this.#router;
    }
}

module.exports = new Controller();