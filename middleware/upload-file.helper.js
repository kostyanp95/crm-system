const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const imgMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/svg+xml',
    'image/tiff',
    'image/jfif',
    'image/vnd.microsoft.icon',
    'image/vnd.wap.wbmp',
    'image/webp'
];

const fileFilter = (req, file, cb) => {
    if (imgMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSIze: 1024 * 1024 * 15
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})
