import axios from "axios"
import { useState, useEffect } from "react"

const FileFormComponent = () => {
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('')

    async function handleSubmitForm(e) {
        e.preventDefault()
        try {
            const url = 'http://localhost:3000/files/new'
            const formData = { file, title }
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            clearForm()
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }

    function handleTitle(e) {
        setTitle(e.target.value)
    }

    function handleFile(e) {
        setFile(e.target.files[0])
    }

    function clearForm() {
        setFile(null)
        setTitle('')
    }

    return (
        <div className="form-component">
            <form onSubmit={handleSubmitForm}>
                <h2>Add File</h2>
                <div>
                    <label>Title : </label>
                    <input type="text" onChange={handleTitle} value={title} />
                </div>
                <div>
                    <label>File : </label>
                    <input type="file" accept=".txt,.html" onChange={handleFile} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FileFormComponent