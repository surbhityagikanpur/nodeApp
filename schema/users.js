const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = new Schema({

    name: {
        type: String,
        
    },
    address: {
        city: String,
        phoneNo: Number

    },
    documents: []


});
userSchema.plugin(AutoIncrement, { inc_field: 'id', id: "userId" });
//jobSchema.index({ index: '2dsphere' });
module.exports = mongoose.model('user', userSchema);