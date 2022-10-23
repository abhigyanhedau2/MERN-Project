const express = require('express');
const placeRouter = require('./routes/place-routes');
require('dotenv').config();

const app = express();

app.use('/api/v1/places', placeRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});