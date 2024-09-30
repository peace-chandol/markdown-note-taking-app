import axios from "axios"
import { useState, useEffect } from "react"


const FileListComponent = () => {
    const [filename, setFilename] = useState([])

    useEffect(() => {
        getFiles()
    }, [])

    async function getFiles() {
        try {
            const url = 'http://localhost:3000/files'
            const response = await axios.get(url)
            const data = response.data
            setFilename(data)
        } catch (err) {
            console.error(err)
        }
    }

    function getFile(e) {
        const url = `http://localhost:3000/${e.target.innerHTML}`
        window.location.href = url
    }

    return (
        <div className="file-list-component">
            <h2>File List</h2>
            {filename.map((file) => (
                <div key={file.id} className="single-file-list">
                    <p className="file-title">{file.title}</p>
                    {/* <p>{file.filename.split('_').slice(1).join('_')}</p> */}
                    <button onClick={getFile} className='file-name'>{file.filename}</button>
                </div>
            ))}
        </div>
    )
}

export default FileListComponent