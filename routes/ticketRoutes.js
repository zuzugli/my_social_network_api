const express = require('express');
const ticketController = require('../controllers/ticketController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/buy', ticketController.buyTicket);

router.use(authController.protect);
router.post('/types', ticketController.createTicketType);

module.exports = router;
