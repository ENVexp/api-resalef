import { getAllMovies } from "./repository.js"
import { isHttps } from "./utils.js";

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

export { listMovies }