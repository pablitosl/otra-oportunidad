const express = require('express')
const routerJobs = express.Router()

const { getAll, formCreate, formEdit, createJob, deleteJob, editJob, getOne } = require('../controllers/jobs.controller')
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

// Detalles de empleo
routerJobs.get('/:id', isAuthenticated, getOne)


routerJobs.post('/', isAuthenticated, createJob)


routerJobs.put('/:id', isAuthenticated, editJob)


routerJobs.delete('/:id', isAuthenticated, deleteJob)


module.exports = routerJobs