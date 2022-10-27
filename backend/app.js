const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const placeRouter = require('./routes/place-routes');
const userRouter = require('./routes/user-routes');
const HttpError = require('./utils/http-error');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {

    // Access-Control-Allow-Origin : which domains should have the access
    // * - all domains can access
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Access-Control-Allow-Headers : which headers incoming request may have
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Access-Control-Allow-Methods : which http methods should be allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use(cors());

app.use('/api/v1/places', placeRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
    next(new HttpError(404, 'Cannot find this route.'))
});

// If we give 4 params to a callback function, it will be treater as error handler functions
app.use((err, req, res, next) => {

    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }

    // If the response has been sent or not
    if (res.headerSent)
        return next(err);

    res.status(err.statusCode || 500).json({
        status: 'fail',
        message: err.message || 'Internal Server Error'
    });

});

// DB Connection string
const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.plozmds.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

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

app.listen(process.env.PORT || 5000, () => {
    console.log('App listening on port 5000');
});