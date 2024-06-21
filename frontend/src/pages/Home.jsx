import React, { useState } from 'react'
import copy from '../images/copy.png'
import axios from 'axios';

const Home = () => {
    const [output,setOutput] = useState('');
    const [inputUrl,setInputUrl] = useState('');
    const backendURL = 'http://localhost:5173'

    const btn1handler = async () => {
        let randomString = '';
        const arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let i=0;i<5;i++) {
            const index = Math.floor(Math.random() * 52);
            randomString += arr[index];
        }
        try {
            const res1 = await axios.post(backendURL,{url:inputUrl,encoding:randomString});
            if(res1) {
                console.log(res1);
                setOutput(randomString);
            }
        } catch (error) {
            console.log('some error occured while making post request');
            console.log('the error is: ', error);
        }
    }
  return (
    <div>
        <h2>Create Short Url</h2>
        <div><input type="text" style={{height: '30px', width: '300px', fontSize: '20px'}} onChange={(e)=>setInputUrl(e.target.value)} placeholder='Enter your url here'/></div>
        <button onClick={btn1handler} style={{height: '30px', width: '100px', fontSize: '20px', margin: '10px'}}>Create</button>
        <div className="outputContainer">
            <div>
                <div>Your short url will appear here 👇</div>
                <div style={{display: 'flex'}}>
                    <div style={{width: '300px', height: '30px', fontSize: '20px', border: '1px solid black', margin: '10px', overflow: 'hidden'}}>{output}</div>
                    <button><img  src={copy} height={25} /></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home