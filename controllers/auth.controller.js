const passport = require('passport')

const Auth = require('../models/auth.model')

const getFormSingUp = (req, res) => res.render('/signup', { layout: 'signupMain' })

const signUp = async (req, res) => {

    try {
        const errors = []
        const { name, email, password, confirm_password } = req.body

        if (password !== confirm_password) {
            errors.push({ msg: 'Las contraseñas no coinciden' })
        }

        if (password.length < 4) {
            errors.push({ msg: 'La contraseña debe tener al menos 4 caracteres' })
        }

        if (errors.length > 0) {
            return res.send('Hay errores')
        }

        const userFound = await Auth.findOne({ email })

        if (userFound) {
            req.flash('todo_error', 'El usuario ya existe en nuestros registros')
            //return res.send('Ya existe el usuario en nuestros registros')
            return res.redirect('/auth/signin')
        }

        const newUser = new Auth({ name, email, password })
        newUser.password = await newUser.passwordEncrypt(password) //Encripto la contraseña

        await newUser.save() //Guardo el modelo

        res.redirect('/jobs')
    } catch (error) {
        console.log('Error', error)
    }

}

const getFormSingIn = (req, res) => res.render('./auth/signin', { layout: 'signinMain' })


const signIn = passport.authenticate('local', {
    successRedirect: '/jobs',
    failureRedirect: '/auth/signin',
})


const logout = async (req, res) => {
    await req.logout(err => {
        if (err) return next()
        res.redirect('/auth/signin')
    })
}

module.exports = {
    getFormSingUp,
    signUp,
    signIn,
    getFormSingIn,
    logout,
}