const schema = require('./schema');
const mongoose = require('mongoose');

//Model middleware here

module.exports = mongoose.model('Position', schema);
