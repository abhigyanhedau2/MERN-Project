const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {

    console.log('GET request in places');

    res.status(200).json({
        status: 'success',
        message: 'It Works!'
    });

});

module.exports = router;