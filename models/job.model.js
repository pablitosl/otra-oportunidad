const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AuthSchema = require('./auth.model')

//Creo el SCHEMA

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
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
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Auth' }
},
{
    versionKey: false,
    timestamps: true,
})


module.exports = mongoose.model('Job', jobSchema)