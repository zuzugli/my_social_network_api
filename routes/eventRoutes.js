const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(eventController.getAllEvents) 
  .post(eventController.createEvent);

router.post('/:id/shoppingList', eventController.addToShoppingList);

module.exports = router;