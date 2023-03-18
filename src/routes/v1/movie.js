const express = require('express')
const router = express.Router()
const { getAll, getById, create, destroy, update } = require('~/controllers/v1/movie')
const validate = require('~/middlewares/validate')
const { authorizeToken } = require('~/middlewares/verify-token')
const movieSchema = require('~/validators/movie')

// all
router.get('/', getAll)
router.get('/:id', getById)

// admin
router.post('/', authorizeToken([1]), validate(movieSchema.create), create)
router.put('/:id', authorizeToken([1]), validate(movieSchema.update), update)
router.delete('/:id', authorizeToken([1]), destroy)

module.exports = router
