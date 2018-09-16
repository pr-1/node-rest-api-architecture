var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/products', products.getAll);
router.get('/api/product/:id', products.getOne);
router.post('/api/product/', products.create);
router.put('/api/product/:id', products.update);
router.delete('/api/product/:id', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/users', user.getAll);
router.get('/api/user/:id', user.getOne);
router.post('/api/user/', user.create);
router.put('/api/user/:id', user.update);
router.delete('/api/user/:id', user.delete);

module.exports = router;