const mongoose = require('mongoose')

//Creo el SCHEMA

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    enterprise: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
},
{
    versionKey: false,
    timestamps: true,
})


module.exports = mongoose.model('Job', jobSchema)