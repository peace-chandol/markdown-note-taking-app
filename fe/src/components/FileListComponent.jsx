import axios from "axios"
import { useState, useEffect } from "react"


const FileListComponent = () => {
    const [filename, setFilename] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        getFiles()
    }, [isDeleting])

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

    function getFile(filename) {
        const url = `http://localhost:3000/${filename}`
        window.location.href = url
    }

    async function deleteBlog(filename) {
        setIsDeleting(true)
        const url = `http://localhost:3000/files/${filename}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            })
    
            if (!response.ok) {
                throw new Error(`Error deleting post: ${response.status}`)
            }
    
            console.log('Post deleted successfully')
    
        } catch (error) {
            console.error('Error deleting post:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="file-list-component">
            <h2>File List</h2>
            {filename.map((file) => (
                <div key={file.id} className="single-file-list">
                    <p className="file-title">{file.title}</p>
                    {/* <p>{file.filename.split('_').slice(1).join('_')}</p> */}
                    <button onClick={() => getFile(file.filename)} className='view-btn'>View</button>
                    <button onClick={() => deleteBlog(file.filename)} className='delete-btn' >Delete</button>
                </div>
            ))}
        </div>
    )
}

export default FileListComponent