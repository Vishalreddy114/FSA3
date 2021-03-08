const express = require('express')
const app = express();

const port = process.env.PORT || 3000;
app.listen(port)
console.log(`App running at ${port}`)

app.get('/',(req,res)=>{
    res.send("Hello world!")
})

app.get('/about',(req,res)=>{
    res.send("You have requested the about page!")
})

app.get('/contact',(req,res)=>{
    res.send("You have requested the contact page!")
})
