const
    app = require('express').Router(),
    db = require('../models/db'),
    P = require('bluebird'),
    chalk = require('../models/chalk')

app.post('/signup', (req, res) => {
        let { body: { username, email, password, password_again }, session } = req

    req.checkBody('username', 'Username is empty').notEmpty()
    req.checkBody('username', 'Username must contain only leters').isAlpha()
    req.checkBody('username', 'Username must be greater than 4').isLength({ min: 4 })
    req.checkBody('username', 'Username must be less than 32').isLength({ max: 32 })

    req.checkBody('email', 'Email is empty').notEmpty()
    req.checkBody('email', 'Email is invalid').isEmail()
    
    req.checkBody('password', 'Password field is empty').notEmpty()
    req.checkBody('password_again', 'Password field is empty').notEmpty()
    req.checkBody('password', 'Passwords don\'t match').equals(password_again)

    P.coroutine(function *(){

        let errors = yield req.getValidationResult()
        
        if(!errors.isEmpty()){
            let 
                result = errors.array(),
                array = []
            result.forEach(item => array.push(item.msg) )
            res.json({ mssg: array })
        } else {
            let 
                user_q = yield db.query('SELECT COUNT(*) as usernameCount from users WHERE username = ?', [username]),
                [{ usernameCount: userCount }] = user_q

            if(userCount == 1){
                res.json({ mssg: "Username already exists!" })
            } else {
                let 
                    email_q = yield db.query('SELECT COUNT(*) as emailCount FROM users WHERE email = ?', [email]),
                    [{ emailCount }] = email_q

                if(emailCount == 1){
                    res.json({ mssg: "Email already exists!" })
                } else {
                    let 
                        newUser = {
                            username, 
                            email: req.body.email,
                            password,
                            joined: new Date().getTime()
                        },
                        create_user = yield db.createUser(newUser),
                        { affectedRows, insertId } = create_user
                        
                    if(affectedRows == 1){

                        res.json({ mssg: "You can now login!!", success: true })
                        
                    }
                }
            }
        }

    })()
})

app.post('/login', (req, res) => {
    P.coroutine(function* (){
        let { body: { username: rusername, password: rpassword }, session } = req

        req.checkBody('username', 'Username is empty').notEmpty()    
        req.checkBody('password', 'Password field is empty').notEmpty()

        let errors = yield req.getValidationResult()

        if(!errors.isEmpty()){
            let 
                result = errors.array()
                array = []
            result.forEach(item => array.push(item.msg) )
            res.json({ mssg: array })
        } else {
            let 
                user = yield db.query('SELECT COUNT(id) as userCount, id, password, email, joined from users WHERE username = ? LIMIT 1', [ rusername ]),
                [{ userCount, id, password, email, joined }] = user
            if(userCount == 0){
                res.json({ mssg: "User not found!" })
            } else if(userCount > 0) {
                let same = yield db.comparePassword(rpassword, password)
                if(!same){
                    res.json({ mssg: "Wrong password!" })
                } else {
                    session.id = id
                    session.username = rusername  
                    session.email = email,
                    session.joined = joined
                    res.json({ mssg: `Hello, ${session.username}!!`, success: true, loggedIn: true, session })
                }
            }
        }
        
    })()
})

app.post('/logout', (req, res) => {
    req.session.id = null
    req.session.username = null
    res.json("Hello, World!!")
})

module.exports = app