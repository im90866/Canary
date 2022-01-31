import React, { Component } from "react";
// import axios, { Axios } from 'axios'; 


class Upload extends Component {
    state = {
        selectedFile: null
    }
    fileSelect = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0]);
       }
    fileUpload = () => {
        const fd = new FormData();
        fd.append('image',this.state.selectedFile, this.state.selectedFile.name);
        // Axios.post('', fd);
    }

    render() {
        return (
            <div className="Upload">
                <input type="file" accept="image/*" onChange={this.fileSelect}/>
                <button onClick={this.fileUpload}>Upload</button>
            </div>
        )
    }
    
}

export default Upload;
    
