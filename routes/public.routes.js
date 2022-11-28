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
    res.render('index', {layout: 'main'})
})

module.exports = routerPublic