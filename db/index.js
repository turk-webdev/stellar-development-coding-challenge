// conenct to MongoDB
const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://stellar:Stay0ff@uerdincluster.bjth3.mongodb.net/stellar_code_test?retryWrites=true&w=majority'
const connection = mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => result)
    .catch(err => console.error(err))

module.exports = connection