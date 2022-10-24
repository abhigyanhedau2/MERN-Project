const express = require('express');
const userController = require('../controllers/user-controllers');
const router = express.Router();

const signUpValidationArr = [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    checkPassword('password').isLength({ min: 6 })
];

const { getUsers, signup, login } = userController;

router.get('/', getUsers);
router.post('/login', login);
router.post('/signup', signUpValidationArr, signup);

module.exports = router;