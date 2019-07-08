const express = require('express')
const UserModel = require('../models/user')
const TodoModel = require('../models/todos')
const verifyToken = require('../middlewares/verifyUser')
const router = express.Router()

router.get('/', verifyToken, (req, res) => {
    todos = []
    let username
    UserModel.findById(req.id, (err, user) => {
        if (err) res.status(400).send('No user with this token!')
        username = user.username
    })

    TodoModel.findOne({ username }, (err, entry) => {
        if (err) return res.status(400).send('error occured!')
        todos = (entry && entry.todos) || []
    })

    return res.json({ todos })
})

router.post('/', verifyToken, async (req, res) => {
    const todos = req.body.todos

    let username = ''
    await UserModel.findById(req.id, (err, user) => {
        if (err) res.status(400).send('No user with this token!')
        username = user.username
        console.log(username)
    })

    const userTodo = new TodoModel({
        username,
        todos,
    })

    try {
        await userTodo.save()
        res.status(200).send('user todo created')
    } catch (err) {
        if (err) res.status(400).send('Cannot enter todos!')
    }
})

module.exports = router
