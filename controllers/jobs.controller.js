const jobModel = require("../models/job.model")

const getAll = async (req, res) => {

    try {

        const jobs = await jobModel.find({}).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript

        //Verifico que existan

        res.status(200).render('jobs/index', { jobs, title: 'Tus empleos - Otra Oportunidad' })

    } catch (error) {
        console.log(error)
    }
}

const getOne = async (req, res) => {
    try {
        const { id } = req.params
        //console.log(id)

        const job = await jobModel.findById(id).lean() // .lean() => Dejarme lo que devuelve como un objeto vanilla javascript
        // console.log(pelicula)

        res.render('jobs/show', { job, title: `Video Club - Viendo: ${job.title}`})
    } catch (error) {
        console.log('Error en getOne', error)
    }
}

const formCreate = (req, res) => {

    res.render('jobs/create', { title: 'Publicar - Otra Oportunidad'})
}

const formEdit = async (req, res) => {

    try {
        const { id } = req.params

        const job = await jobModel.findById(id).lean()

        if (!job) {
            return res.status(400).send('Algo salio mal')
        }

        res.render('jobs/edit', { job, title: `Editando: ${job.title}` })

    } catch (error) {
        console.log('Error Form Edit', error)
    }

}

const createJob = async (req, res) => {

    try {
        console.log(req.body)
        const job = new jobModel(req.body)
        job.user = req.user.id
        await job.save()
        res.status(201).redirect('/jobs')
    } catch (error) {

        console.log(`Algo fallo en el create: ${error}`)
        res.status(500).json({ msg: 'Algo fallo en el serviros', error: true })
    }
}

const editJob = async (req, res) => {

    try {

        const { id } = req.params
        const job = req.body

        await jobModel.updateOne({ _id: id }, { $set: job })

        res.status(200).redirect('/jobs')

    } catch (error) {
        console.log('Fallo la edicion', error)
        res.status(500).send('Error interno en la edicion')
    }

}

const deleteJob = async (req, res) => {

    try {
        await jobModel.findByIdAndDelete(req.params.id)

        res.status(200).redirect('/jobs')


    } catch (error) {
        console.log('Error DELETE', error)
        res.status(500).send('Algo salio mal')
    }
}


module.exports = {
    getAll,
    getOne,
    formCreate,
    formEdit,
    createJob,
    editJob,
    deleteJob
}