const express = require('express')
const path = require ('path')
const router = express.Router()
const locationRoutes = require('./location.routes');


router.get('/',(req,res)=>
{
    return res.render('./location/index.ejs',{ title: 'Home' ,layout:false});
});

router.get('/index', (req, res) => {
    return res.redirect('/');
});


try {
    router.use('/location', locationRoutes);
  } catch (err) {
    LOG.error(`ERROR: ${err.message}`);
  }
    
 // Route requests that start with an expression to a controller
//  router.use('/location',require('../controllers/locationController'));

module.exports = router;