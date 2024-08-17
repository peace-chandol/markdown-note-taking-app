const express = require('express')
const router = express.Router()
const fileController = require('../controller/fileController')
const upload = require('../config/multer')

router.post('/new', upload.single('file'), fileController.createFile)
router.use('/', express.static('files'))

module.exports = router