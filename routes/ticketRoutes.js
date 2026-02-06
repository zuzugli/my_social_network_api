const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router.post('/buy', ticketController.buyTicket);

module.exports = router;