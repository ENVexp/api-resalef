const express = require('express');
const axios = require('axios');

const app = express();

app.get('/teste', async (req, res)=>{
    try {
        const response = await axios.get(
            "http://chead.cc:80/movie/Ronnyy/root@2424/990540.mp4",
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

app.get('/tes', (req, res)=>{
    res.json({test: req.query.url, host: req.hostname})
    
    /*try {
        const response = await axios.get(
            "http://chead.cc:80/movie/Ronnyy/root@2424/990540.mp4",
            {
            responseType: 'stream'
        });

        res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
        res.setHeader('Content-Length', response.headers['content-length'] || undefined);

        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Erro', details: error.message });
    }*/
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;