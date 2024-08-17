const connectDB = require('../config/dbConn')

const createFile = async (req, res) => {
    const { title } = req.body
    const filename = req.file.filename

    try {
        const mySqlDB = await connectDB()
        const results = await mySqlDB.query(`INSERT INTO files (filename, title) VALUES ('${filename}', '${title}')`)

        res.json({
            message: 'insert successful',
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({ message: 'error with server' })
    }
}

module.exports = {
    createFile
}