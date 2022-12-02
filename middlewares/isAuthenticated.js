const isAuthenticated = (req, res, next) => {
    
    if (req.isAuthenticated()) { // true o false => si el usuario esta logueado, le digo
        return next()
    }
    res.redirect('/auth/signin') // Si no es autenticado, se tiene que loguear
}



module.exports = isAuthenticated