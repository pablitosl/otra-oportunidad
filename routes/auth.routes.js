const express = require('express')
const routerAuth = express.Router()

const { getFormSingUp, signUp, getFormSingIn, signIn, logout } = require('../controllers/auth.controller')

// Routers Auth

routerAuth.post('/add', function(req, res, next) {
    res.status(201).render('new', { isAdded : true } );
 });

routerAuth.get('/signup', getFormSingUp)
routerAuth.post('/signup', signUp)

routerAuth.get('/signin', getFormSingIn)
routerAuth.post('/signin', signIn)

routerAuth.get('/logout', logout)

module.exports = routerAuth