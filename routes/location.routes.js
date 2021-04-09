const router = require('express').Router();
const controller = require('../controllers/locationController.js');
const LOG = require('../util/logger');

LOG.info('Starting location routing.');


router.get('/findall', controller.findAll);
router.get('/findRandom',controller.findRandom);
router.get('/findone/:locationId', controller.findOne);

// handle three requests to perform database actions (HTTP POST)

router.post('/save', controller.saveNew);
router.post('/save/:locationId', controller.saveEdit);
router.post('/delete/:locationId', controller.deleteItem);

// handle five requests for webpages (HTTP GET)

router.get('/', controller.showIndex);
router.get('/create', controller.showCreate);
router.get('/details/:locationId', controller.showDetails);
router.get('/edit/:locationId', controller.showEdit);
router.get('/delete/:locationId', controller.showDelete);

router.get('/location',controller.showIndex);

router.get('/list',controller.showList);

LOG.info('Loaded locations routes.');

module.exports = router;