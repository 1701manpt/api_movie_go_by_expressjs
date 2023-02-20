const express = require('express')
const router = express.Router()

// controllers
const { getAll, getById, create, update, destroy } = require('../../controllers/v1/product')

// validators
const { authenticateToken } = require('../../middlewares/verifyToken')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', authenticateToken, create)

// router.put( '/:id', authenticateToken, checkId, checkUpdate, logValidation, update )
router.put('/:id', update)

router.delete('/:id', authenticateToken, destroy)

module.exports = router
