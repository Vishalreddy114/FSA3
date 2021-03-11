const express = require('express')
const path = require ('path')
const router = express.Router()

router.get('/',(req,res)=>
{
    return res.render('index.ejs',{ title: 'Home' });
});

router.get('/index', (req, res) => {
    return res.redirect('/');
});

 // Route requests that start with an expression to a controller
//  router.use('/location',require('../controllers/locationController'));

module.exports = router;