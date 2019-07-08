const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/', async (req, res) => {
    const { username, email, password } = req.body

    const user = new User({
        username,
        email,
        password,
    })

    try {
        const saveduser = await user.save()
        return res.status(200).send(saveduser._id)
    } catch (error) {
        console.log(error)
        return res.status(400).send('user cannot be registered try again!')
    }
})

module.exports = router
