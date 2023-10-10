const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users.js');
const isAuth = require('../middleware/is-auth.js');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', isAuth, usersCtrl.checkToken)

module.exports = router;
