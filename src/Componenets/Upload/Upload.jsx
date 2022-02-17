import React from "react";
import { useState } from 'react';
import axios from 'axios'; 



export default function Upload() {

    const [image, setImage] = useState({
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
        console.log(file)
    }

    const base64 = (file) => {
        console.log(file.name)
        var reader = new FileReader();
        reader.onloadend = function (file) {
            console.log(file)
            setImage({
                image64: String(file.target.result)
            })
            console.log(file.target.result)
        }
        reader.readAsDataURL(file);
    }

    const fileUpload = () => {
        const fd = new FormData();
        console.log(image)
        fd.append('image', image.selectedFile);

        var images = new Image();
        images.src = image.image64
        setImage({
            imageFile: images
        })

        //const base64 = await convertToBase64(file);
        axios.post('http://localhost:8000/storeImageInWorkspace/', fd).then((res) => {
            console.log("somethinggggg")
        });
    }


    return (
        <div className="Upload">
            <input type="file" onChange={fileSelect} accept="image/*"/>
            <button onClick={fileUpload}>Upload</button>
            <img src={image.image64} width="600" height="400" alt="" className></img>
        </div>
    )
}
