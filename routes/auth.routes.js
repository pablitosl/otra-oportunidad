const express = require('express')
const routerAuth = express.Router()

const { getFormSingUp, signUp, getFormSingIn, signIn, logout } = require('../controllers/auth.controller')

// Routers Auth

routerAuth.get('/signup', getFormSingUp)
routerAuth.post('/signup', signUp)

routerAuth.get('/signin', getFormSingIn)
routerAuth.post('/signin', signIn)

routerAuth.get('/logout', logout)

module.exports = routerAuth