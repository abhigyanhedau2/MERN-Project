const jwt = require('jsonwebtoken');
const HttpError = require("../utils/http-error");

const checkAuth = (req, res, next) => {

    let token;

    try {

        token = req.headers.authorization.split(' ')[1];    // Authorization: 'Bearer <Token>'

        if (!token)
            return next(new HttpError(401, 'Authentication failed.'));

        const decodedToken = jwt.verify(token, 'supersecret_dont_share');

        req.userData = {
            userId: decodedToken.userId,
        };

        next();

    } catch (error) {
        return next(new HttpError(401, 'Authentication failed.'));
    }

};

module.exports = checkAuth;