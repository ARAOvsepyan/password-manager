const Router = require('express')
const authRouter = require('./authRouter')
const authMiddleware = require('../middleware/authMiddleware')
const employeeRouter = require('./employeeRouter')

const router = new Router()

router.use('/auth', authRouter)
router.use('/employee', authMiddleware, employeeRouter)

module.exports = router