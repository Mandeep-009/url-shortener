import React, { useEffect, useState } from 'react'
import { Link, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Path = () => {
    const backendURL = 'http://localhost:5173';
    const [response,setResponse] = useState('');
    const [currentPath,setCurrentPath] = useState('');

    useEffect(()=>{
        const fullUrl = window.location.href;
        const lastSlashIndex = fullUrl.lastIndexOf('/');
        const code = fullUrl.substring(lastSlashIndex + 1);
        setCurrentPath(code);
        console.log(currentPath);

        async function fn () {
            try {
                const result = await axios.get(`${backendURL}/${currentPath}`);
                if(result) {
                    // window.location.href = result.data;
                    console.log(result.data)
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