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
        <div>
            <h1>File List Component</h1>
            {filename.map((file) => (
                <div key={file.id}>
                    <p>{file.title}</p>
                    <p>{file.filename.split('_').slice(1).join('_')}</p>
                    <p onClick={getFile}>{file.filename}</p>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default FileListComponent