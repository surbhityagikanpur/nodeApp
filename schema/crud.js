let mongoose = require('mongoose');

module.exports.create = function (data, schema, callBack) {
    schema.create(data, function (error, data) {
        if (error) {
            callBack(error, null)
        } else {
            callBack(null, data)
        }
    });
};

module.exports.find = function (data, schema, callBack) {
    schema.find(data, function (error, data) {
        if (error)
            callBack(error, null)
        else
            callBack(null, data)
    });
};

module.exports.findById = function (id, schema, callBack) {
    schema.findById(id, function (error, data) {
        if (error) {
            callBack(error, null);
        } else {
            callBack(null, data);
        }
    });
};

module.exports.updateOne = function (condition, data, options, schema, callBack) {
    schema.updateOne(condition, data, options, function (error, data) {
        if (error) {
            callBack(error, null)
        } else {
            callBack(null, data)
        }
    });
};


