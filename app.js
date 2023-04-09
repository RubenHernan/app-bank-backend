const express = require('express');
const app = express();

const userRoutes = require('./routes/user.routes');
const transferRoutes = require('./routes/transfer.routes');
const authRouter = require('./routes/auth.routes');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appErrors');

//1. MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

//2. ROUTES

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users', authRouter);
app.use('/api/v1/transfer', transferRoutes);

//ERRORS


app.all('*', (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server! 🧨`, 404));
});

app.use(globalErrorHandler);


//3. EXPORTS APP

module.exports = app;
