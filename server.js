const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')


const routerJobs = require('./routes/jobs.routes')
const routerAuth = require('./routes/auth.routes')
const routerPublic = require('./routes/public.routes')


require('dotenv').config()
const app = express()

//Configuracion de handlebars
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
require('./config/passport')

//Middleware
app.use(express.static('public')) //Sirvo archivos estaticos desde la carpeta public
app.use(express.urlencoded({extended: true})) // Decodifico la informacion que viaja por body
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) =>{
    res.locals.todo_ok = req.flash('todo_ok')
    res.locals.todo_error = req.flash('todo_error')
    next()
})

//Router
app.use('/', require('./routes/public.routes'))
app.use('/all', routerPublic)
app.use('/jobs', routerJobs)
app.use('/auth', routerAuth)

const PORT = process.env.PORT

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Base de datos conectada')
        app.listen(PORT)
        console.log(`Todo funcionando en el puerto ${PORT}`)
    } catch (error) {
        console.log(`Ocurrio un error ${error}`)
    }
}

start()