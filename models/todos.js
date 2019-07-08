const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    todos: {
        type: [Object],
        default: [],
    },
})

module.exports = mongoose.model('UserTodos', TodoSchema)
