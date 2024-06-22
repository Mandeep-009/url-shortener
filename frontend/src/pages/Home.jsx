import React, { useState } from 'react'
import copy from '../images/copy.png'
import axios from 'axios';
import { backendURL } from '../config';

const Home = () => {
    const [output,setOutput] = useState('');
    const [inputUrl,setInputUrl] = useState('');
    axios.defaults.withCredentials = true;

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
                setOutput(`https://small-url-delta.vercel.app/${res1.data.coding}`);
            }
        } catch (error) {
            console.log('some error occured while making post request');
            console.log('the error is: ', error);
        }
    }
    const copyFn = () => {
        navigator.clipboard.writeText(output);
        const tempOutput = output;
        setOutput('copied....')
        const out01 = document.querySelector('.out01');
        out01.style.backgroundColor = 'gray';
        out01.style.textAlign = 'center';
        setTimeout(() => {
            setOutput(tempOutput)
            out01.style.backgroundColor = 'white';
            out01.style.textAlign = 'left';
        }, 1000);
    }
  return (
    <div>
        <h2>Create Short Url</h2>
        <div><input type="text" style={{height: '30px', width: '300px', fontSize: '20px'}} onChange={(e)=>setInputUrl(e.target.value)} placeholder='Enter your url here (including https)'/></div>
        <button onClick={btn1handler} style={{height: '30px', width: '100px', fontSize: '20px', margin: '10px'}}>Create</button>
        <div className="outputContainer">
            <div>
                <div>Your short url will appear here 👇</div>
                <div style={{display: 'flex'}}>
                    <input className='out01' readOnly value={output} style={{width: '360px', height: '30px', fontSize: '20px', border: '1px solid white', margin: '10px', overflow: 'hidden'}} />
                    <button onClick={copyFn}><img src={copy} height={25} /></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home