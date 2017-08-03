const
    app = require('express').Router(),
    P = require('bluebird'),
    db = require('../models/db')

app.post('/get-session', (req, res) => {
    let 
        { session } = req,
        loggedIn = session.id ? true : false
    res.json({ loggedIn, session })
})

module.exports = app