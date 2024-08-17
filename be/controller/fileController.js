const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')
const connectDB = require('../config/dbConn')

const getFiles = async (req, res) => {
    try {
        const mySqlDB = await connectDB()
        const sql = `SELECT * FROM files`
        await mySqlDB.query(sql, (error, results) => {
            if (error) throw error
            return res.json(results)
        })

    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({ message: 'error with server' })
    }
}

const createFile = async (req, res) => {
    const { title } = req.body
    const filename = req.file.filename

    try {
        const mySqlDB = await connectDB()
        const sql = `INSERT INTO files (filename, title) VALUES ('${filename}', '${title}')`
        await mySqlDB.query(sql, (err, results) => {
            if (err) throw err
            return res.json({ message: 'insert successful' })
        })

    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({ message: 'error with server' })
    }
}

const getFile = async (req, res) => {
    const { filename } = req.params

    try {
        const mySqlDB = await connectDB()
        const sql = `SELECT * FROM files WHERE filename = '${filename}'`
        await mySqlDB.query(sql, (error, results) => {
            if (error) throw error
            return res.json({ message: results[0] })
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({ message: 'error with server' })
    }
}

const deleteFile = async (req, res) => {
    const { filename } = req.params
    
    try {
        const mySqlDB = await connectDB()
        const sql = `DELETE FROM files WHERE filename = '${filename}'`
        await mySqlDB.query(sql, (err, results) => {
            if (err) throw err

            const deletePath = path.join(__dirname, '..', 'files', filename)
            if (fs.existsSync(deletePath)) {
                fsPromises.unlink(deletePath)
            }

            return res.json({ message: `deleted ${filename}` })
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({ message: 'error with server' })
    }
}

module.exports = {
    getFiles,
    createFile,
    getFile,
    deleteFile
}