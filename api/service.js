/*const Utils = require('./utils.js')

class Service {
    #client;
    #config;

    constructor() {
        this.#client = require('./client.js');
        this.#config = require('./config.js');
        //permite ser usado como callback
        this.login = this.login.bind(this);
        this.listMovies = this.listMovies.bind(this);
        this.userInfo = this.userInfo.bind(this);
        this.loadResource = this.loadResource.bind(this);
    }

    async login(request, response) {
        if (!request.query.username) {
            response.status(405).json({ message: 'username é obrigatorio' })
        } else if (!request.query.password) {
            response.status(405).json({ message: 'password é obrigatorio' })
        } else {
            try {
                const dns = request.query.dns || this.#config.defaultDNS;
                const username = request.query.username;
                const password = request.query.password;
                const res = await this.#client.getUserInfo(dns, username, password);
                if (res.data) {
                    if (res.data.user_info.auth == 0) {
                        response.status(401).json({ message: 'Credenciais de acesso invalidas' });
                    } else {
                        const token = require('./token.js');
                        response.status(200).json({
                            username: res.data.user_info.username,
                            message: res.data.user_info.message,
                            status: res.data.user_info.status,
                            exp_date: res.data.user_info.exp_date,
                            token: token.create(dns, username, password)
                        })
                    }
                } else {
                    response.status(500).json({ message: 'Serviço indisponivel' })
                }
            } catch (error) {
                response.status(500).json({ message: error.message });
            }
        }
    }

    async listMovies(request, response) {
        const res = await this.#client.getAllMovies(JSON.parse(request.token));
        response.json(
            res.data.map(movie => {
                const icon = movie.stream_icon;
                if (Utils.isHttps(icon)) {
                    return movie;
                }
                return {
                    ...movie,
                    stream_icon: this.#client.urls.resource(request.hostname, icon, request.query.token)
                }
            })
        );
    }

    

    async userInfo(request, response) {
        const res = await this.#client.getUserInfo();
        response.json(res.data);
    }

    async loadResource(request, response) {
        try {
            const res = await this.#client.getStream(request.query.url);
            response.setHeader('Content-Type', res.headers['content-type'] || 'application/octet-stream');
            response.setHeader('Content-Length', res.headers['content-length'] || undefined);
            res.data.pipe(response);
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }
}

module.exports = new Service();*/

import Utils from './utils.js';
import client from './client.js';
import config from './config.js';
import path from 'path';
import token from './token.js';
import { fileURLToPath } from 'url';

// Simula o __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));


class Service {

    constructor() {
        //permite ser usado como callback
        this.login = this.login.bind(this);
        this.listMovies = this.listMovies.bind(this);
        this.listSeries = this.listSeries.bind(this);
        this.player = this.player.bind(this);
        this.serieDetails = this.serieDetails.bind(this);
        this.listChannels = this.listChannels.bind(this);
        this.listMoviesCategory = this.listMoviesCategory.bind(this);
        this.listChannelsCategory = this.listChannelsCategory.bind(this);
        this.listSeriesCategory = this.listSeriesCategory.bind(this);
        this.userInfo = this.userInfo.bind(this);
        this.loadResource = this.loadResource.bind(this);
        this.token = this.token.bind(this);
        this.docs = this.docs.bind(this);
    }

    async token(request, response) {
        // Caminho absoluto para o arquivo token.html
        const filePath = path.resolve(__dirname, '../public/token.html');
        response.sendFile(filePath);
    }

    async docs(request, response) {
        // Caminho absoluto para o arquivo token.html
        const filePath = path.resolve(__dirname, '../public/docs.html');
        response.sendFile(filePath);
    }

    async login(request, response) {
        if (!request.query.username) {
            response.status(405).json({ message: 'username é obrigatorio' })
        } else if (!request.query.password) {
            response.status(405).json({ message: 'password é obrigatorio' })
        } else {
            try {
                const dns = request.query.dns || config.defaultDNS;
                const username = request.query.username;
                const password = request.query.password;
                const res = await client.getUserInfo(dns, username, password);
                if (res.data) {
                    if (res.data.user_info.auth == 0) {
                        response.status(401).json({ message: 'Credenciais de acesso invalidas' });
                    } else {
                        response.status(200).json({
                            username: res.data.user_info.username,
                            message: res.data.user_info.message,
                            status: res.data.user_info.status,
                            exp_date: res.data.user_info.exp_date,
                            token: token.create(dns, username, password)
                        })
                    }
                } else {
                    response.status(500).json({ message: 'Serviço indisponivel' })
                }
            } catch (error) {
                response.status(500).json({ message: error.message });
            }
        }
    }

    async listMovies(request, response) {
        const res = await client.getAllMovies(JSON.parse(request.token));
        try {
            response.status(200).json(
                res.data.map(movie => {
                    const icon = movie.stream_icon;
                    if (Utils.isHttps(icon)) {
                        return movie;
                    }
                    return {
                        ...movie,
                        stream_icon: client.urls.resource(request.hostname, icon, request.query.token)
                    }
                })
            );
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async listSeries(request, response) {
        const res = await client.getAllSeries(JSON.parse(request.token));
        try {
            response.status(200).json(
                res.data.map(serie => {
                    const icon = serie.cover;
                    /* 
                    removido para resolver o problema de carregar em todas
                    if (Utils.isHttps(icon)) {
                         return serie;
                     }*/
                    return {
                        ...serie,
                        cover: client.urls.resource(request.hostname, icon, request.query.token)
                    }
                })
            );
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async serieDetails(request, response) {
        if (!request.query.id) {
            response.status(400).json({ message: 'id obrigatorio' })
        }
        try {
            const res = await client.getSerieDetails(JSON.parse(request.token), request.query.id);
            response.send(res.data);
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async listChannels(request, response) {
        try {
            const res = await client.getAllChannels(JSON.parse(request.token));
            console.log(res, res.data)
            response.status(200).json(
                res.data.map(channel => {
                    const icon = channel.stream_icon;
                    if (Utils.isHttps(icon)) {
                        return channel;
                    }
                    return {
                        ...channel,
                        stream_icon: client.urls.resource(request.hostname, icon, request.query.token)
                    }
                })
            );
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }


    async listMoviesCategory(request, response) {
        try {
            const res = await client.getMoviesCategory(JSON.parse(request.token));
            response.status(200).json(res.data);
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async listChannelsCategory(request, response) {
        try {
            const res = await client.getChannelsCategory(JSON.parse(request.token));
            response.status(200).json(res.data);
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async listSeriesCategory(request, response) {
        try {
            const res = await client.getSeriesCategory(JSON.parse(request.token));
            response.status(200).json(res.data);
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }


    async player(request, response) {
        if (!request.query.type) {
            response.status(400).json({ message: 'type é obrigatorio' })
            return;
        }
        if (!request.query.id) {
            response.status(400).json({ message: 'id é obrigatorio' })
            return;
        }
        if (!request.query.extension) {
            response.status(400).json({ message: 'extension é obrigatorio' })
            return;
        }
        try {
            const res = await client.getPlayer(
                JSON.parse(request.token),
                request.query.type,
                request.query.id,
                request.query.extension
            );

            //console.log(res)
            const responseUrl = res.request.res.responseUrl;
            const redirectUrl = responseUrl; // Exemplo: verifica o cabeçalho 'Location'

            if (redirectUrl) {
                // Redireciona o cliente para o link obtido
                const u =  client.urls.resource(request.hostname, redirectUrl);
                console.log('red: '+ redirectUrl)
                console.log('montado: ' +u)
                return response.redirect(
                   u
                );
            }
            console.log('teste' + res)
            
            // Se não houver redirecionamento, responde com o conteúdo da requisição
            response.status(res.status).send(res.data);
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
        /* try {
             const res = await client.getPlayer(
                 JSON.parse(request.token),
                 request.query.type,
                 request.query.id,
                 request.query.extension
             );
             
            // response.setHeader('Content-Type', res.headers['content-type'] || 'application/x-mpegurl');
             //response.setHeader('Content-Length', res.headers['content-length'] || undefined);
           
             Object.entries(res.headers).forEach(([key, value]) => {
                 response.setHeader(key, value);
             });
             console.log(res.headers.getUserAgent());
             res.data.pipe(response);
         } catch (error) {
             response.status(500).json({ error: error.message })
         }*/
    }

    async userInfo(request, response) {
        const res = await client.getUserInfo();
        response.json(res.data);
    }

    async loadResource(request, response) {
        try {
            console.log('chamado :'+ request.query.url)
            const res = await client.getStream(request.query.url);
            
            response.setHeader('Content-Type', res.headers['content-type'] || 'application/octet-stream');
            response.setHeader('Content-Length', res.headers['content-length'] || undefined);
            res.data.pipe(response);
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }
}

export default new Service();