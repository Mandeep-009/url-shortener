const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {port, mongodb_url} = require('./config');
const Code = require('./models/url');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('hello, this is backend server');
})

app.get('/:short_code', async (req,res) => {
    const {short_code} = req.params;
    try {
        const result = await Code.findOne({coding: short_code})
        if(result){
            return res.status(200).send(result.url);
        }
        return res.status(404).send('no such encoding found')
    } catch (error) {
        console.log('an error occured: ', error.errorResponse.errmsg);
        return res.status(500).send('some error occured');
    }
})

app.post('/', async (req,res) => {
    const {url,encoding} = req.body;
    try {
        const result = await Code.create({url,coding:encoding});
        if(result) {
            return res.status(201).send(result);
    }
    } catch (error) {
        console.log('an error occured: ', error.errorResponse.errmsg);
        res.status(400).send('document creation rejected due to some database constraints');
    }
    
})

mongoose
    .connect(mongodb_url)
    .then(()=>{
        console.log('server connected to database');
        app.listen(port, ()=>{
            console.log('server is listening on port ', port)
        })
    })