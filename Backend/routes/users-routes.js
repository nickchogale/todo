const express = require('express');

const usersControllers = require('../controllers/users-controller')
const { check } = require('express-validator');
const router = express.Router();


router.post('/register',
[
    check('name')
    .trim()
    .notEmpty(),
    check('email')
    .normalizeEmail()
    .isEmail(),
    check('password')
    .isLength({min:6})

], 
usersControllers.register);

router.post('/login', usersControllers.login);

module.exports = router;