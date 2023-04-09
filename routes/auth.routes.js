const authController = require('../controllers/auth.controller');
const validations = require('../middlewares/validations.middleware')
const express = require('express');

const router = express.Router();

router.post('/signup', validations.signupValidation, authController.signup);
router.post('/login', validations.loginValidation, authController.login); //469948

module.exports = router;