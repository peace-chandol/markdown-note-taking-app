const express = require('express')
const app = express()
const connectDB = require('./config/dbConn')
const cors = require('cors')
const PORT = process.env.PORT || 3000

connectDB()
app.use(cors())
app.use(express.json())

app.use('/files', require('./routes/fileRoute'))
app.use('/', express.static('files'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))