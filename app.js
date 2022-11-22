const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

const port = 3000;

app.listen(port, () => {
    console.log('App running on port ' + port);
});
