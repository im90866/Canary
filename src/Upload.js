import axios, { Axios } from 'axios'; 


function Upload() {
    state = {
        selectedFile: null
    }
    fileSelect = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })

    }
    fileUpload = () => {
        const fd = new FormData();
        fd.append('image',this.state.selectedFile, this.state.selectedFile.name);
        Axios.post('', fd);
    }
    
    return (
        <div className="Upload">
            <input type="file" onChange={this.fileSelect}/>
            <button onClick={this.fileUpload}>Upload</button>
        </div>
    )
}

export default Upload;
    
