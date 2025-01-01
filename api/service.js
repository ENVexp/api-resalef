/*const { getAllMovies } = require("./repository.js");
const { isHttps } = require("./utils.js");

async function listMovies(request, response){
    const res = await getAllMovies();
    const list = res.data.map(movie=>{
        const icon = movie.stream_icon;
        if(isHttps(icon)){
            return movie;
        }
        return {...movie, stream_icon:`https://${request.hostname}/resource?path=${icon}`}
    });
    response.json(list);
}

module.exports = { listMovies }*/

const Utils = require('./utils.js')

class Service{
    #client;
    constructor(){
        this.#client = require('./repository.js')
    }

    async listMovies(request, response){
        const res = await this.#client.getAllMovies();
        const list = res.data.map(movie=>{
            const icon = movie.stream_icon;
            if(Utils.isHttps(icon)){
                return movie;
            }
            return {...movie, stream_icon:`https://${request.hostname}/resource?path=${icon}`}
        });
        response.json(list);
    }
}

module.exports = new Service();