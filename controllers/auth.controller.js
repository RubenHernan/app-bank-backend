const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErrors');
const {  randomAccount} = require('../utils/numAccount')

exports.signup = catchAsync(async (req, res, next) => {
    let user, accountNumber;
    const { requestTime } = req;
    const { name, password } =
      req.body;
  
      do {
        accountNumber = randomAccount();

        user = await User.findOne({
          where: {
            accountNumber,
          },
        });
      } while (user);
  
    const userCreate = await User.create({
      name,
      password,
      accountNumber
    });
    res.status(201).json({
      status: 'success',
      message: 'The user has been created!',
      requestTime,
      userCreate,
    });

})


exports.login = catchAsync(async (req, res, next) => {
  const { requestTime } = req;
  const { accountNumber, password } =
    req.body;

     const user = await User.findOne({
        where: {
          accountNumber,
          password
        },
      });

      if (!user) {
        return next(new AppError('Invalid Credentials!', 404));
      }

  res.status(200).json({
    status: 'success',
    message: 'Log in!',
    requestTime,
    user,
  });

})

