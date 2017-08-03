const 
    app = require('express').Router()

app.get('*', (req, res) => {
    res.render('app')
})

module.exports = app
