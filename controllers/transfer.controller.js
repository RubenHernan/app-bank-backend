const Transfer = require('../models/Transfer');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');


exports.create = catchAsync(async (req, res) => {
  const { requestTime,amountTransfer,senderUserId,receiverUserId } = req;

  const transfer = await Transfer.create({
    amount: amountTransfer,
    senderUserId,
    receiverUserId
  });

  
    await User.update({
        amount: amount - amountTransfer
    }, { where: {
        id: senderUserId
    }} );

    await User.update({
        amount: amount + amountTransfer
    }, { where: {
        id: receiverUserId
    }} );


  res.status(201).json({
    status: 'success',
    message: 'The transfer has been successful!',
    requestTime,
    transfer,
  });

});
