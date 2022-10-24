const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const placeRouter = require('./routes/place-routes');
const userRouter = require('./routes/user-routes');
const HttpError = require('./utils/http-error');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


app.use('/api/v1/places', placeRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
    next(new HttpError(404, 'Cannot find this route.'))
});

// If we give 4 params to a callback function, it will be treater as error handler functions
app.use((err, req, res, next) => {

    // If the response has been sent or not
    if (res.headerSent)
        return next(err);

    res.status(err.statusCode || 500).json({
        status: 'fail',
        message: err.message || 'Internal Server Error'
    });

});

// Connecting to database
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('Successfully connected to the database');
    } catch (error) {
        console.log(`Some error occured while connecting to database: ${error}`);
    }
}

connectToDB();

app.listen(5000, () => {
    console.log('App listening on port 5000');
});