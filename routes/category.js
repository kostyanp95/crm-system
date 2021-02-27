const express = require('express')
const passport = require("passport");
const router = express.Router()

const controller = require('../controllers/category')
const fileUpload = require('../middleware/upload-file.helper')

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }),     controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), fileUpload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), fileUpload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router
