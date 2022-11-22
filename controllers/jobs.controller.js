const jobModel = require("../models/job.model")

const getAll = async (req, res) => {

    try {
        const jobs = await jobModel.find({}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        //Verifico que existan

        res.status(200).render('jobs/index', { jobs })

    } catch (error) {
        console.log(error)
    }
}

const formCreate = (req, res) => {
    res.render('jobs/create')
}

const formEdit = (req, res) => {
    res.render('jobs/edit')
}

const createJob = async (req, res) => {

    try {
        console.log(req.body)
        const job = new jobModel(req.body)
        await job.save()
        res.status(201).redirect('/jobs')
    } catch (error) {

        console.log(`Algo fallo en el create: ${error}`)
        res.status(500).json({ msg: 'Algo fallo en el serviros', error: true })
    }
}


module.exports = {
    getAll,
    formCreate,
    formEdit,
    createJob
}