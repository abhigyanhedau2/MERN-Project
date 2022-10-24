const express = require('express');
const validator = require('express-validator');
const userController = require('../controllers/user-controllers');
const router = express.Router();

const signUpValidationArr = [
    validator.check('name').not().isEmpty(),
    validator.check('email').normalizeEmail().isEmail(),
    validator.check('password').isLength({ min: 6 })
];

const { getUsers, signup, login } = userController;

router.get('/', getUsers);
router.post('/login', login);
router.post('/signup', signUpValidationArr, signup);

module.exports = router;