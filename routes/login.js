const express = require('express')
const JWT = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user')

router.post('/', (req, res) => {
    const { username, password } = req.body

    User.findOne({ username }, (err, user) => {
        if (err) return res.status(400).send('user not found!')
        if (user.password === password) {
            const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
            return res
                .status(200)
                .cookie('auth-token', token)
                .send(token)
        }
    })
})

module.exports = router
