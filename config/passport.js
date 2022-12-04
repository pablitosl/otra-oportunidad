const passport = require('passport')
const { Strategy } = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy
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

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            //get the user data from google 
            const newUser = {
                googleId: profile.id,
                name: profile.displayName,
                image: profile.photos[0].value,
                email: profile.emails[0].value
            }

            try {
                //find the user in our database 
                let user = await Auth.findOne({ googleId: profile.id })

                if (user) {
                    //If user present in our database.
                    done(null, user)
                } else {
                    // if user is not preset in our database save user data to database.
                    user = await Auth.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err)
            }
        }
    )
)

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// used to deserialize the user
passport.deserializeUser((id, done) => {
    Auth.findById(id, (err, user) => done(err, user))
})

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Auth.findById(id, (err, user) => {
        done(err, user)
    })
})