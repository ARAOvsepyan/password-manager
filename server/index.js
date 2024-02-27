const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/index');
const errorMiddleware = require('./middleware/errorMiddleware')


app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL
// }));
app.use('/api', router);
app.use(errorMiddleware);
