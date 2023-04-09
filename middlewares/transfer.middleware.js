const User = require('../models/User');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');

exports.validTransferExistUser = catchAsync(async (
    req,
    res,
    next
  ) => {
    const { numAccountStart , numAccountEnd , amountTransfer } = req.body;
  
    const userStart = await User.findOne({
      where: {
        accountNumber: numAccountStart
      },
    });
  
    if (!userStart) return next(new AppError('Origin Account doesnt exits!', 404));


    const userEnd = await User.findOne({
        where: {
          accountNumber: numAccountEnd
        },
      });
    
    if (!userEnd) return next(new AppError('Destination Account doesnt exits!', 404));
    

    if(userStart.amount < amountTransfer) return next(new AppError('The origin account doesnt have enough cash!', 404));

    req.amountTransfer = amountTransfer;
    req.senderUserId = userStart.id;
    req.receiverUserId = userEnd.id;

    next();
  });
  
  