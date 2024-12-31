import { listMovies } from './service.js';
import { Axios } from 'axios';
import express from 'express';
import cors from 'cors';
//const express = require('express');
//const axios = require('axios');
//const cors = require("cors");
const dns = 'http://chead.cc:80/';
export const app = express();



app.use(cors());

app.get('/teste', async (req, res)=>{
    try {
        const response = await Axios.get(
            dns+"movie/Ronnyy/root@2424/990540.mp4",
            {
            responseType: 'stream'
        });

        res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
        res.setHeader('Content-Length', response.headers['content-length'] || undefined);

        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Erro', details: error.message });
    }
})

app.get('/lista', async(req, res)=>{

    listMovies(req, res);
   /* const host = req.hostname;

    const response = await axios.get(
        'http://chead.cc/player_api.php?username=Ronnyy&password=root@2424&action=get_vod_streams'
       // 'http://chead.cc/player_api.php?username=Ronnyy&password=root@2424&action=get_live_streams'
    )
    const list = response.data.map(item =>{
       // return {...item}
        return {...item, stream_icon: `https://${host}/resource?path=${item.stream_icon}`}
    })
    res.set(response.headers);
    res.set('Content-Type', 'application/json');
    res.json(list);
   // res.send(list);*/
})

app.get('/resource', async (req, res)=>{
    const url = req.query.path;
    //res.json({path: req.query.path, host: req.hostname})
    
    try {
    const response = await Axios.get(
        url,
        {responseType: 'stream'}
    );

        res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
        res.setHeader('Content-Length', response.headers['content-length'] || undefined);

        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Erro', details: error.message });
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//export{ app };