const db = require('../db')
const { Snippet } = require('../models/snippet')

const createNewSnippet = async (req, res, next) => {
    const { name, expires_at, snippet } = req.body

    const obj = new Snippet({
        name: name,
        expires: expires_at,
        snippet: snippet
    })

    await obj.save()
    .then(result => {
        res.send({
            'status': 'success',
            'message': result
        }).status(200)
    })
    .catch(err => {
        res.send({ 
            'status': 'failure',
            'message': 'Something went wrong with adding the snippet',
            'error': err
        }).status(500)
        console.error(err)
    })
}

const getSnippet = async (req, res, next) => {
    const { name } = req.params

    await Snippet.find({name: name}, (err, data) => {
        if (err) {
            res.send({
                'status': 'failure',
                'message': 'Error with snippet lookup',
                'error': err
            }).status(500)
            return
        }

        if (data.length === 0) {
            res.send({
                'status': 'failure',
                'message': 'Could not find snippet',
                'error': err
            }).status(404)
            return
        }

        if (data[0].expires < Date.now()) {
            res.send({
                'status': 'forbidden', 
                'message': 'This snippet view window has expired'
            }).status(403)
        }

        res.send(data[0]).status(200)
    })
}

const likeSnippet = async (req, res, next) => {
    const { name } = req.params

    const doc = await Snippet.find({name: name}, (err, data) => {
        if (err) {
            res.send({
                'status': 'failure',
                'message': 'Error with snippet lookup',
                'error': err
            }).status(500)
            return
        }

        if (data.length === 0) {
            res.send({
                'status': 'failure',
                'message': 'Could not find snippet',
                'error': err
            }).status(404)
            return
        }

        if (data[0].expires < Date.now()) {
            res.send({
                'status': 'forbidden', 
                'message': 'This snippet view window has expired'
            }).status(403)
            return
        }
    })

    doc[0].likes++
    await Snippet.findOneAndUpdate({name: doc[0].name}, {likes: doc[0].likes},{new: true})
    res.send(doc[0]).status(200)
}

module.exports = {
    createNewSnippet,
    getSnippet,
    likeSnippet
}