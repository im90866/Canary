import React, { Component } from "react";
import {useState} from 'react';
import axios, { Axios } from 'axios'; 

function Upload() {
    const[image,setImage]=useState({
       selectedFile: null,
       imageFile: null,
       image64: null,
    });

    const fileSelect = (event) => {
        var file = event.target.files[0]
        base64(file)
        setImage({
            selectedFile: file, 
            imageFile: URL.createObjectURL(event.target.files[0]),
            image64: null,
            imageReturn: null
        })                
    }

    const base64 = (file) => {
        var reader = new FileReader();
        reader.onloadend = function() {
            setImage({
                image64: String(reader.result)
            })
        }
        reader.readAsDataURL(file);
    }

    const fileUpload = () => {
        const fd = {
            'link' : image.image64
        }

        //const base64 = await convertToBase64(file);
        axios.post('http://localhost:8000/returnImage/', fd).then((res) => {
            console.log(res.data['link'])
            setImage({
                imageReturn : res.data['link']
            }) 
        });
    }

    return (
        <div className="Upload">
            <input type="file" onChange={fileSelect}/>
            <button onClick={fileUpload}>Upload</button>
            <img src={image.imageReturn} width="600" height="400"></img>
        </div>
    )
}


export default Upload;
    
