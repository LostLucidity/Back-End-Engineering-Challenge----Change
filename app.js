const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const tillRoutes = require('./api/routes/till');

app.use(morgan('dev'));
app.use(bodyParser.json());
//  Routes
app.use('/api/till', tillRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;