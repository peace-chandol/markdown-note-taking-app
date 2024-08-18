import './App.css'
import FileFormComponent from './components/FileFormComponent'
import FileListComponent from './components/FileListComponent'

function App() {

    return (
        <>
            <h1>Markdown Note Taking App</h1>
            <FileFormComponent />
            <FileListComponent />
        </>
    )
}

export default App