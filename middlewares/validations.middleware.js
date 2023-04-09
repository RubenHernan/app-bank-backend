const { body,validationResult } = require('express-validator');

const validFields = (req,res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            status: "error",
            errors: error.mapped()
        })
    }
    next();
}

//Validating user

exports.signupValidation = [body('name').notEmpty().withMessage('Name is required!'),body('password').notEmpty().withMessage('Password is required!').isLength({min:8}).withMessage('Password must be at least 8 characters long'), validFields];


exports.loginValidation = [body('accountNumber').notEmpty().withMessage('Account number is required!'),body('password').notEmpty().withMessage('Password is required!'), validFields];

//validating transger

exports.transferValidation = [body('amountTransfer').notEmpty().withMessage('Amount is required!').isFloat().withMessage('Must be a valid amount!'), body('numAccountStart').notEmpty().withMessage('Number of origin account is required!').isNumeric().withMessage('Must be a valid account!').isLength({min:6,max:6}).withMessage('Account must be 8 characters long'), body('numAccountEnd').notEmpty().withMessage('Number of destiny account is required!').isNumeric().withMessage('Must be a valid account!').isLength({min:6,max:6}).withMessage('Account must be 8 characters long'), validFields];

