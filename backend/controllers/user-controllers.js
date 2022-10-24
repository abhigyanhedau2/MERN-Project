const HttpError = require('../utils/http-error');
const uuid = require('uuid').v4;

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Abhigyan Hedau',
        email: 'test@test.com',
        password: 'pass123'
    }
];

const getUsers = (req, res, next) => {

    res.status(200).json({
        status: 'success',
        results: DUMMY_USERS.length,
        data: {
            users: DUMMY_USERS
        }
    });

};

const signup = (req, res, next) => {

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(user => user.email === email);

    if(hasUser)
        return next(new HttpError(400, 'EMail already exists. Try logging in'));

    const newUser = {
        id: uuid(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(newUser);

    res.status(201).json({
        status: 'success',
        user: newUser
    });

};

const login = (req, res, next) => {

    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(user => user.email === email);

    if (!identifiedUser || (identifiedUser.password !== password))
        return next(new HttpError(401, 'Invalid Credentials'));

    res.status(200).json({
        status: 'success',
        user: identifiedUser
    });

};

module.exports = { getUsers, signup, login };