const express = require('express')
const app = express()
const mysql = require('mysql')
const multer = require('multer')
const PORT = process.env.PORT || 3000

app.use(express.json())
let conn = null

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'peace',
        database: 'markdown-note-taking-app',
        // database: 'test',
        port: 3306
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

app.post('/files/new', upload.single('file'), async (req, res) => {
    try {
        const { title } = req.body
        const filename = req.file.filename
        const results = await conn.query(`INSERT INTO files (filename, title) VALUES ('${filename}', '${title}')`)

        res.json({
            message: 'insert successful',
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({ message: 'error with server' })
    }
})

app.use('/files', express.static('files'))

app.post('/', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.send('File uploaded successfully!')
})

app.listen(PORT, async () => {
    await initMySQL()
    console.log(`Server running on port ${PORT}`)
})