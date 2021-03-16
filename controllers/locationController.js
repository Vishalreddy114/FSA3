const express = require('express')
const api = express.Router()
const locationModel = require('../models/location.js')
const notfoundstring = 'location not found'
const bodyParser = require('body-parser');
// const cons = require('consolidate');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
    console.log(`Handling /findall ${req}`)
    locationModel.find({}, (err, data) => {
        if(err){
            return res.end(notfoundstring)
        }
      res.json(data)
    })
  })
  
  // GET one JSON by ID
  api.get('/findone/:id', (req, res) => {
    console.log(`Handling /findone ${req}`)
    const id = parseInt(req.params.id)
    locationModel.find({ locationid: id }, (err, results) => {
      if (err) { return res.end(notfoundstring) }
      res.json(results[0])
    })
  })
  
  // RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/locations', async (req,res)=>{
  console.log(`Handling GET / ${req}`)
   await locationModel.find({},(err,data)=>{
        if (err) {
            return res.end('error on create')
        }
        res.locals.locations = data
        var locations = res.locals.locations;
        console.log(res.locals.locations, "locations are here")
        res.render('location/details', {title: 'locationslTest', locations})
    })
})

  
// GET create
api.get('/create', (req, res) => {
    console.log(`Handling GET /create ${req}`)
    locationModel.find({}, (err, data) => {
      res.locals.locations = data
      console.log(`locations ${res.locals.locations}`)
      res.locals.location = new Model()
      console.log(`location ${res.locals.location}`)
      return res.render('location/create')
    })
  })

  // GET /delete/:id
  api.post('/delete/:id',(req, res)=>{
    console.log(req.params,'Handling delete')
    const id = parseInt(req.params.id)
    console.log(id,'id')
    locationModel.deleteOne({locationId:id}).setOptions({single:true}).exec((err, deleted) =>{
        if(err) {
            return res.end("Could not find the record to delete")
        }
        console.log(`RETURNING VIEW FOR ${JSON.stringify(deleted)}`)
        return res.redirect('/location/locations')
    })
})


api.post('/edit/:locationId', (req, res) => {
  console.log(`Handling EDIT`)
    var locationid= req.params.locationId
    console.log(locationid)

    locationModel.find({ locationId: locationid }, (err, results) => {
      if (err) { return res.end('could not find') }
      // res.json(results[0])
      console.log(results) 
      // res.locals.student = results[0]
      var locationName = results[0].locationName;
      res.render('location/edit.ejs',{ locationid, locationName})
    })
  })

  // RESPOND WITH DATA MODIFICATIONS 

  // POST new

  api.post('/save',(req,res)=>{
    console.log('into the save')
      const body = req.body
      console.log(body)
      const location = new locationModel(body)
      console.log(location,"body is here")
      location.save((err) => {
          if(err){
              return res.status().json({"msg": err})
          }else{
            console.log("location save")
          //   res.render('location/details')
          //  return res.redirect("location/locations")
            return res.json({
                "error": false,
                data: location
            })
          }
      
      })
  })

// POST update with id
api.post('/update/:id', (req, res) => {
  console.log(` update request ${req.body}`)
    const tId = parseInt(req.params.id)
    // console.log(`Handling SAVING ID:${id}`)
    console.log(tId)
    console.log(req.body.tName)
    locationModel.updateOne({locationId: tId },
      { 
        // use mongoose field update operator $set
        $set: {
          locationName: req.body.tName
        }
      },
      (err, item) => {
        if (err) { return res.end(`Record with the specified id not found`) }
        // console.log(`ORIGINAL VALUES ${JSON.stringify(item)}`)
        // console.log(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
        // console.log(`SAVING UPDATED location ${JSON.stringify(item)}`)
        return res.redirect('/location/locations')
      })
  })



module.exports = api