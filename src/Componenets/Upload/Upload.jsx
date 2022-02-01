import React, { Component } from "react";
import {useState} from 'react';
// import axios, { Axios } from 'axios'; 



function Upload() {
    const[image,setImage]=useState({
       selectedFile: null,
       imageFile: null
    });

    const fileSelect = (event) => {
        setImage({
            selectedFile: event.target.files[0], 
            imageFile: URL.createObjectURL(event.target.files[0])
        })
        console.log(event.target.files[0]);
       }

    const fileUpload = () => {
        const fd = new FormData();
        console.log(image.selectedFile)
        fd.append('image',image.selectedFile, image.selectedFile.name);
        // Axios.post('', fd);
    }

    return (
        <div className="Upload">
            <input type="file" onChange={fileSelect}/> 
            <button onClick={fileUpload}>Upload</button>
            <img src={image.imageFile} width="600" height="400" className></img>
        </div>
    )
}


export default Upload;