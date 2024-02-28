const Router = require('express')
const employeeController = require('../controllers/employeeController')

const router = new Router()

router.get('', employeeController.getAll)
router.get('/:id', employeeController.getById)
router.post('', employeeController.create)
router.patch('/:id' ,employeeController.update)
router.delete('/:id', employeeController.delete)

module.exports = router