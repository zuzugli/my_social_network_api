const express = require('express');
const albumController = require('../controllers/albumController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/', albumController.createAlbum); 
router.post('/:id/photos', albumController.addPhoto); 

module.exports = router;