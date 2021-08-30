const express = require('express')
const router = express.Router()

const { createNewSnippet, getSnippet, likeSnippet } = require('../controllers/snippets')

router.get('/', (req, res, next) => {
    res.send({'message': 'hello world'}).status(200)
})

/* POST new snippet */
router.post('/snippets/:name', (req, res, next) => {
    createNewSnippet(req, res, next)
})

/* GET existing snippet */
router.get('/snippets/:name', (req, res, next) => {
    getSnippet(req, res, next)
})

/* POST to like snippet */
router.post('/snippets/:name/like', (req, res, next) => {
    likeSnippet(req, res, next)
})

module.exports = router
