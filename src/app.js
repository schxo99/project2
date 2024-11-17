const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { sequelize } = require('./models')

app.use(express.json());
dotenv.config();

app.listen(process.env.PORT);

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const userRouter = require('./routes/userRouter');
const tripRouter = require('./routes/tripRouter');
const scheduleRouter = require('./routes/scheduleRouter');
const reviewRouter = require('./routes/reviewRouter')

app.use('/users', userRouter);
app.use('/trip', tripRouter);
app.use('/schedule', scheduleRouter);
app.use('/review', reviewRouter)
