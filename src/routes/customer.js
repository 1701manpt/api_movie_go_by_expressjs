const express = require('express')
const router = express.Router()

// validate
const { checkId, checkCreate } = require('../validators/customer')

// middleware
const logValidation = require('../middlewares/validation')
const sendMail = require('../middlewares/sendMail')

// controllers
const { getAll, getById, signUp, update, destroy, restore, destroyForce, verify } = require('../controllers/customer')

router.get('/', getAll)

router.get('/:id', checkId, logValidation, getById)

router.post('/', checkCreate, logValidation, signUp, sendMail)

router.put('/:id', checkId, logValidation, update)

router.delete('/:id', checkId, logValidation, destroy)

router.post('/:id', checkId, logValidation, restore)

router.delete('/:id/destroy', checkId, logValidation, destroyForce)

router.get('/:id/verify/:confirmationCode', verify)

module.exports = router