const express = require('express')
const routerJobs = express.Router()

const { getAll, formCreate, formEdit, createJob } = require('../controllers/jobs.controller')
const isAuthenticated = require('../middlewares/isAuthenticated')

//Get All - Publico
/* routerJobs.get('/all', (req, res) => {
    res.render('index', {layout: 'main'})
}) */

//Get All - Privado
routerJobs.get('/', isAuthenticated, getAll)

// Formulario de creacion de empleos
routerJobs.get('/create', isAuthenticated, formCreate)

// Formulario de edicion de empleos
routerJobs.get('/edit/:id', isAuthenticated, formEdit)

routerJobs.get('/:id', isAuthenticated, (req, res) => {
    res.send('Detalle de un empleo')
})


routerJobs.post('/', isAuthenticated, createJob)


routerJobs.put('/:id', isAuthenticated, (req, res) => {
    res.send('Editar un empleo')
})


routerJobs.delete('/:id', isAuthenticated, (req, res) => {
    res.send('Borrar un empleo')
})


module.exports = routerJobs