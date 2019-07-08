const express = require('express')
const UserModel = require('../models/user')
const TodoModel = require('../models/todos')
const verifyToken = require('../middlewares/verifyUser')
const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
    todos = []
    let username
    await UserModel.findById(req.id, (err, user) => {
        if (err) res.status(400).send('No user with this token!')
        username = user.username
    })

    await TodoModel.findOne({ username }, async (err, entry) => {
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

router.post('/update', verifyToken, async (req, res) => {
    const { newTodo } = req.body
    let username

    await UserModel.findById(req.id, (err, user) => {
        if (err) return res.status(400).send('No user with this token!')
        username = (user && user.username) || ''
    })

    try {
        const updatedTodo = await TodoModel.updateOne({ username }, { $push: { todos: newTodo } })
        return res.json(updatedTodo)
    } catch (err) {
        console.log(err)
        return res.status(400).send('Cannot update todos!')
    }
})

module.exports = router
