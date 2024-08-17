const express = require('express')
const router = express.Router()
const fileController = require('../controller/fileController')
const upload = require('../config/multer')

router.get('/', fileController.getFiles)
router.post('/new', upload.single('file'), fileController.createFile)

router.route('/:filename')
    .get(fileController.getFile)
    .delete(fileController.deleteFile)

module.exports = router