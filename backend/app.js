const bodyParser = require('body-parser');
const express = require('express');
const placeRouter = require('./routes/place-routes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


app.use('/api/v1/places', placeRouter);

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

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});