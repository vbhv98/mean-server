const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        dropDups: true,
    },
    todos: {
        type: [Object],
        default: [],
    },
})

module.exports = mongoose.model('UserTodos', TodoSchema, 'usertodos')
