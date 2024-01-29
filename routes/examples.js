const express = require('express');
const router = express.Router();

const ExampleController = require('../controllers/ExampleController');

router
  .get('/', ExampleController.index);


module.exports = router;