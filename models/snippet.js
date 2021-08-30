const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const snippetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    }
})

const Snippet = mongoose.model('snippet', snippetSchema)
module.exports = {
    Snippet,
}