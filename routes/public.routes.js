const express = require('express')
const jobModel = require('../models/job.model')
const routerPublic = express.Router()

routerPublic.get('/', (req, res) => {
    res.render('home', {layout: 'landing'})
})

routerPublic.get('/all', async (req, res) => {

    try {

        const jobs = await jobModel.find({}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        //Verifico que existan

        res.status(200).render('index', { layout: 'main', jobs })


    } catch (error) {
        console.log(error)
    }
})

routerPublic.get('/all/:id', async (req, res) => {
    try {
        const { id } = req.params
        //console.log(id)

        const job = await jobModel.findById(id).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript
        // console.log(pelicula)

        res.render('all/showPublic', { job, title: `Video Club - Viendo: ${job.title}`})
    } catch (error) {
        console.log('Error en getOne', error)
    }
})

routerPublic.get('/nosotros', async (req, res) => {
    res.render('all/nosotros')
})

module.exports = routerPublic