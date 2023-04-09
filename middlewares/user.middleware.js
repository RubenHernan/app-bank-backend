const User = require('../models/User');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');

exports.validExistUser = catchAsync(async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
  next();
});
