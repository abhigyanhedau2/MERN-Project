const express = require('express');
const userController = require('../controllers/user-controllers');
const router = express.Router();

const { getUsers, signup, login } = userController;

router.get('/', getUsers);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;