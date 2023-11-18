const { Router } = require('express')
const userControllers = require('./controllers/User')

const routes = Router()

routes.get('/', userControllers.readUsers)
routes.get('/:id', userControllers.readUserById)
routes.post('/', userControllers.createUser)
routes.post('/auth/login', userControllers.login)
routes.put('/:id', userControllers.updateUser)
routes.delete('/:id', userControllers.deleteUser)

module.exports = routes
