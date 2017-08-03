require('dotenv').config()

// INSTALLED PACKAGES
const
    express = require('express'),
    port = process.env.PORT,
    hbs = require('express-handlebars'),
    path = require('path'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    session = require('client-sessions'),
    app = express()

// REQUIRING PROJECT FILES
const 
    chalk = require('./models/chalk'),
    mRoutes = require('./routes/main-routes'),
    uRoutes = require('./routes/user-routes'),
    apiRoutes = require('./routes/api-routes')

// VIEW ENGINE
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname+'/views/layout/')
}))
app.set('view engine', 'hbs')

// MIDDLEWARES
app.use(favicon(path.join(__dirname+'/public/images/favicon/favicon.ico')))
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(session({
    cookieName: "session",
    secret: process.env.SESSION_SECRET_LETTER,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))
app.use(express.static(__dirname+'/public/'))

// ROUTE MIDDLEWARES
app.use('/', mRoutes)
app.use('/user', uRoutes)
app.use('/api', apiRoutes)

app.listen(port, () => chalk.s(`App running..`) )
