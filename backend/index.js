import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import {port,mongodb_url} from './config.js'
import Code from './models/url.js';

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: ["https://small-url-delta.vercel.app","http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.get('/', (req,res) => {
    res.send('hello, this is backend server');
})

app.get('/:short_code', async (req,res) => {
    const {short_code} = req.params;
    try {
        const result = await Code.findOne({coding: short_code})
        if(result){
            return res.status(200).send(result);
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
        const existingDoc = await Code.findOne({url});
        if(existingDoc)
            return res.status(200).send(existingDoc);
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
    .catch((err)=>{
        console.log('an error occured: ', err)
    })
export default app;