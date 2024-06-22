import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../config';

const Path = () => {
    const {code} = useParams();
    const [response,setResponse] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        async function fn () {
            try {
                const result = await axios.get(`${backendURL}/${code}`);
                if(result) {
                    window.location.href = `${result.data.url}`;
                    console.log(result.data.url)
                    return;
                }
            } catch (error) {
                if(error.response && error.response.data) {
                    setResponse(error.response.data);
                    return console.log(error.response.data);
                }
                console.log('an error occured', error)
            }
        }
        fn();
    },[])
  return (
    <div>
        <div>
            { response && 
                 (
                    <>
                        <h2>{response}</h2>
                        <Link to='/'>
                            <button style={{height:'30px'}}>Create a short url</button>
                        </Link>
                    </>
                )}
        </div>
        
    </div>
  )
}

export default Path