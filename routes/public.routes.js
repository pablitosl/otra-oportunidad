const express = require('express')
const jobModel = require('../models/job.model')
const routerPublic = express.Router()


routerPublic.get('/', (req, res) => {
    res.render('home', {layout: 'landing'})
})

//Filtro Argentina
routerPublic.get('/all/arg', async (req, res) => {
    try {

        const jobs = await jobModel.find({ location:{$in:[ 'Argentina', 'argentina', 'ARGENTINA', ]}}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

//Filtro Cordoba
routerPublic.get('/all/cord', async (req, res) => {
    try {

        const jobs = await jobModel.find({ location:{$in:[ 'CORDOBA', 'cordoba', 'Cordoba', 'Córdoba', 'córdoba', 'CÓRDOBA' ]}}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

//Filtro Bs As
routerPublic.get('/all/bsas', async (req, res) => {
    try {

        const jobs = await jobModel.find({ location:{$in:[ 'Buenos Aires', 'buenos aires', 'BUENOS AIRES', ]}}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

//Filtro CABA
routerPublic.get('/all/caba', async (req, res) => {
    try {

        const jobs = await jobModel.find({ location:{$in:[ 'CABA', 'caba', 'Caba', ]}}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

//Alfabetico asc
routerPublic.get('/all/alfasc', async (req, res) => {
    try {

        let sort = { title: 1}
        const jobs = await jobModel.find({}).sort(sort).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

//Alfabetico desc
routerPublic.get('/all/alfasc', async (req, res) => {
    try {

        let sort = { title: -1}
        const jobs = await jobModel.find({}).sort(sort).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

//Creado asc
routerPublic.get('/all/asc', async (req, res) => {
    try {

        let sort = { createdAt: 1}
        const jobs = await jobModel.find({}).sort(sort).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

//Creado desc
routerPublic.get('/all/desc', async (req, res) => {
    try {

        let sort = { createdAt: -1}
        const jobs = await jobModel.find({}).sort(sort).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.status(200).render( 'index', { layout: 'main', jobs })
    } catch (error) {
        console.log('Error', error)
    }
})

routerPublic.get('/all', async (req, res) => {

    try {
        const jobs = await jobModel.find({}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript
        //Verifico que existan

        res.status(200).render( 'index', { layout: 'main', jobs })


    } catch (error) {
        console.log(error)
    }
})

routerPublic.get('/all/:id', async (req, res) => {
    try {
        const { id } = req.params

        const job = await jobModel.findById(id).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        res.render('all/showPublic', { job, title: `${job.title}`})
    } catch (error) {
        console.log('Error en getOne', error)
    }
})

routerPublic.get('/nosotros', async (req, res) => {
    res.render('all/nosotros')
})

module.exports = routerPublic