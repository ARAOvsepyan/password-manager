const Router = require('express')
const authController = require('../controllers/authController')

const router = new Router()

router.post('/singin', authController.singin)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.get('/refresh', authController.refresh)


module.exports = router