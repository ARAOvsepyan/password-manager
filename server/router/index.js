const Router = require('express')
const authRouter = require('./authRouter')
const authMiddleware = require('../middleware/authMiddleware')
const userRouter = require('./userRouter')

const router = new Router()

router.use('/auth', authRouter)
// router.use('/user', authMiddleware, userRouter)

module.exports = router