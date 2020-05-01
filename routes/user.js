const express = require('express');
const userRoute = express.Router();
const controller = require('../controller/user');

//userRoute.get('/', controller.home)
userRoute.post('/api/user', controller.add);
userRoute.post('/api/document', controller.document);

module.exports = userRoute;