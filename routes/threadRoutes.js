const express = require('express');
const threadController = require('../controllers/threadController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(threadController.createThread);

router
  .route('/:id')
  .get(threadController.getThread); 

router
  .route('/:id/messages')
  .post(threadController.postMessage);

router
  .route('/:threadId/messages/:messageId/reply')
  .post(threadController.replyToMessage);

module.exports = router;