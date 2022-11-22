const passport = require('passport')
const { Strategy } = require('passport-local')
const Auth = require('../models/auth.model')

passport.use(
    new Strategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            const user = await Auth.findOne({ email }) //Email existe

            if (!user) {
                return done(null, false, { message: 'User not found.' })
            }

            const isMatch = await user.checkPassword(password)

            if (!isMatch) {
                return done(null, false, { message: 'Password error.' })
            }

            //El usuario existe y es valido
            return done(null, user)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Auth.findById(id, (err, user) => {
        done(err, user)
    })
})