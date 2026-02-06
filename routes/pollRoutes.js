const express = require('express');
const pollController = require('../controllers/pollController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router.route('/')
  .get(pollController.getAllPolls)
  .post(pollController.createPoll);

module.exports = router;