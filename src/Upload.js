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
            imageFile: null,
            //imageFile: URL.createObjectURL(event.target.files[0])
            image64: null
        })                
    }

    const base64 = (file) => {
        var reader = new FileReader();
        reader.onloadend = function() {
            setImage({
                image64: String(reader.result)
            })
            console.log(image.image64)
        }
        reader.readAsDataURL(file);
    }

    const fileUpload = () => {
        const fd = new FormData();
        fd.append('image',image.selectedFile, image.selectedFile.name);

        var images = new Image();
        images.src = image.image64
        setImage({
            imageFile: images
        })

        //const base64 = await convertToBase64(file);
        axios.post('http://localhost:8000/store/', fd).then((res) => {
            console.log("somethinggggg")
        });
    }

    return (
        <div className="Upload">
            <input type="file" onChange={fileSelect}/>
            <button onClick={fileUpload}>Upload</button>
            <img src={image.imageFile} width="600" height="400"></img>
        </div>
    )
}


export default Upload;
    
