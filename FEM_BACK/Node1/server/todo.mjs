import express from 'express'
import bp from 'body-parser'
import morgan from 'morgan'

const app = express()

app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(morgan('dev'))

const db = {
    todos: [],
}

app.get('/todo/:id', (req, res) => {
    const { id } = req.params
    const todo = db.todos.find(todo => todo.id === +id)
    console.log(todo)
    res.json({ todo })
})

app.post("/todo", (req, res) => {
    const newTodo = { complete: false, id: Date.now(), text: req.body.text }
    db.todos.push(newTodo)
    res.json({ data: newTodo })
})


app.listen(8080, () => {
    console.log('Server running on localhost 8080!')
})