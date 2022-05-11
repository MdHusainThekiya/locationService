const express = require('express');
const locTableController = require('../controllers/locTableController');
const router = express.Router()

router.post('/createTable', locTableController.create)
router.post('/getLocation', locTableController.getLocation)

module.exports = router