const express = require('express')
const path = require ('path')
const router = express.Router()
const locationRoutes = require('./location.routes');
const LOG = require('../util/logger');
LOG.info('routes/index.js: STARTING custom routes......');


const appTitle = 'FSA3';
const appSubTitle = 'our collaborative full stack app';
router.get('/',(req,res)=>
{
    return res.render('index.ejs',{ 
      title: appTitle ,
      subTitle: appSubTitle,
      
    });     
  });

router.get('/index', (req, res) => {
    return res.redirect('/');
});

router.get('/awesomeappdev',(req, res) => {
  return res.render('./about.ejs');
});

try {
    router.use('/location', locationRoutes);
  } catch (err) {
    LOG.error(`ERROR: ${err.message}`);
  }
    
 // Route requests that start with an expression to a controller
//  router.use('/location',require('../controllers/locationController'));
LOG.info('routes/index.js: ENDING custom routes......');

module.exports = router;