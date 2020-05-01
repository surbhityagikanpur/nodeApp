const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let documentSchema = new Schema({
    userId: {
        type: Number
    },
    text: {
        type: String
    },
    date: {
        type: String
    }


});
module.exports = mongoose.model('document', documentSchema);