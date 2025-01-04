const express = require('express');
const cors = require("cors");
const app = express();
const config = require('./config.js');
const controller = require('./controller.js');
const token = require('./token.js');
const router = controller.getRouter();
middlewares = [
    (req, res, next) => {
        if (config.serviceOn === 'true') {
           next();
        } else {
            res.status(500).json({ message: 'Serviço indisponivel' })
        }
    },
    //token rules
    (req, res, next) => {
        const clearPath = req.path.replaceAll(config.baseUrl, '').replace(/\/$/, '');
        console.log(clearPath)
        switch (clearPath) {
            case '/login':
            case '/routers':
                req.requireToken = false;
                break;
            default:
                req.requireToken = true;
        }
        next();
    },
    //resolve token
    (req, res, next) => {
        if (req.requireToken) {
            if (req.query.token) {
                try {
                    req.token = token.decode(req.query.token);
                    next();
                } catch (error) {
                    res.status(401).json({ message: 'Token invalido' })
                }
            } else {
                res.status(401).json({ message: 'token é obrigatorio' })
            }
        } else {
            next();
        }
    }
];
app.use(config.baseUrl, express.static('html'));
app.use(cors());
//apply middlewares
middlewares.forEach(middleware => app.use(middleware));
app.use(config.baseUrl, router);



const port = config.port;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;