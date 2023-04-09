const Transfer = require('../models/Transfer');
const catchAsync = require('../utils/catchAsync');

exports.listHistory = catchAsync(async (req, res) => {
  const { requestTime,user } = req;

  const transfers = await Transfer.findAll({
    where:{
        id: user.id
    }
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    results: transfers.length,
    transfers,
  });
});

