const express = require('express');
const usersController = require('../controllers/user.controller');
const usersMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

router
  .route('/:id/history')
  .get(usersMiddleware.validExistUser,usersController.listHistory);

module.exports = router;
