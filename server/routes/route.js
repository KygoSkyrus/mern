const express = require('express');
const router = express('router');


//routes
router.get('/', (req, res) => {
    console.log('this is home in console');
    res.send("this is home with response")
})

router.get('/about', (req, res) => {
    res.send('hey about');
})

router.post('/contact', (req, res) => {
    res.send('hey about');
})


module.exports = router;