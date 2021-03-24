const express = require('express')
const app = express();
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon');
const morgan = require('morgan'); // logging

// dependencies - allow multiple view engines
const engines = require('consolidate');

// dependencies - production
const expressStatusMonitor = require('express-status-monitor');
const helmet = require('helmet'); // safer http headers
const compression = require('compression'); // smaller=faster

// const port = process.env.PORT || 3000;
const LOG = require('./util/logger');
// configure app variables
const isProduction = process.env.NODE_ENV === 'production';
LOG.info('Environment isProduction = ', isProduction);

// bring in logger


//set the root view folder
app.set('views', path.join(__dirname, './views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)
app.use(expressStatusMonitor());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // bodyParser not needed
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(expressLayouts);
app.use(morgan('combined'));

app.use(helmet()); // security, http headers
app.use(compression()); // compress all routes

// app middleware - expose passport req.location to views
app.use((req, res, next) => {
  res.locals.location = req.location;
  next();
});

LOG.info('app middleware configured');



// app middleware - configure routing
const baseUrl = process.env.BASE_URL || '/';
app.use(baseUrl, require('./routes/index'));

// error handler from
//  https://github.com/mdn/express-locallibrary-tutorial/blob/master/app.js
 app.use((req, res, err) => {
//   // set locals, only providing errors in development
 res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
  res.status(err.status || 500);
   res.render('error.ejs', { title: 'Error', res });
 });

// export the express app (helpful for testing)
// see bin/www.js for environment-specific startup
module.exports = app;
// const router = require('./routes/router')
// app.use('/', router)

// app.listen(port,()=>
//   {
//     try{
//     console.log(`\nApp running at http://localhost:3000/`)
//   }catch(err)
//   {
//     console.error(err.message);
//   }
//   }
// );

// module.exports = router;


// app.get('/',(req,res)=>{
//     res.render('/index.html')
// })

// app.get('/about',(req,res)=>{
//     res.send("You have requested the about page!")
// })

// app.get('/contact',(req,res)=>{
//     res.send("You have requested the contact page!")
// })
