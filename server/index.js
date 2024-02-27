require('dotenv').config()

const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const router = require('./router/index');
const errorMiddleware = require('./middleware/errorMiddleware')


const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL
// }));
app.use('/api', router);
app.use(errorMiddleware);


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();
