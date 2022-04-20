const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://0.0.0.0:27017', {useNewUrlParser: true});

module.exports = { connect };


