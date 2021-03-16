const router = require('express').Router();
const controller = require('../controllers/locationController.js');

// handle two requests for JSON (HTTP GET)

router.get('/findall', controller.findAll);
router.get('/findone/:id', controller.findOne);

// handle three requests to perform database actions (HTTP POST)

router.post('/save', controller.saveNew);
router.post('/save/:id', controller.saveEdit);
router.post('/delete/:id', controller.deleteItem);

// handle five requests for webpages (HTTP GET)

router.get('/', controller.showIndex);
router.get('/create', controller.showCreate);
router.get('/details/:id', controller.showDetails);
router.get('/edit/:id', controller.showEdit);
router.get('/delete/:id', controller.showDelete);


module.exports = router;