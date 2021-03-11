const express = require('express')
const app = express();
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const port = process.env.PORT || 3000;

//set the root view folder
app.set('views', path.join(__dirname, './views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
// app.engine('ejs', engines.ejs)

app.use(expressLayouts);
app.use(express.static("public"));

const router = require('./routes/router')
app.use('/', router)

app.listen(port,()=>
  {
    try{
    console.log(`\nApp running at http://localhost:3000/`)
  }catch(err)
  {
    console.error(err.message);
  }
  }
);

module.exports = router;


// app.get('/',(req,res)=>{
//     res.render('/index.html')
// })

// app.get('/about',(req,res)=>{
//     res.send("You have requested the about page!")
// })

// app.get('/contact',(req,res)=>{
//     res.send("You have requested the contact page!")
// })
