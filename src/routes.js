/**
 * ROUTES
 */
const express = require('express');
const routes = express.Router();

const payController = require('./controllers/PayController');

//POST

routes.post('/pay', payController.store);

module.exports = routes;