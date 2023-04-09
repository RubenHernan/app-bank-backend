const express = require('express');
const transferController = require('../controllers/transfer.controller');
const transferMiddleware = require('../middlewares/transfer.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    validationMiddleware.transferValidation, transferMiddleware.validTransferExistUser, transferController.create
  );


module.exports = router;
