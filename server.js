const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors")
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

let items = [
 
];
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


let itemsIdCounter = 1;
 

function findTaskById(id) {
    return items.find(task => items.id === id);
}
 
// Route to get all tasks
app.get('/items', (req, res) => {
    res.json(items);
});
 
// Route to get a task by ID
app.get('/items/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
 
    const task = findTaskById(taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task  GOT' });
    }
 
    res.json(task);
});
 
// Route to create a new task
app.post('/items', (req, res) => {
    const { title, status } = req.body;
    if (!title || !status) {
        return res.status(400).json({ error: 'Task POSTED' });
    }
 
    const newTask = {
        id: taskIdCounter++,
        title,
        status
    };
 
    items.push(newTask);
    res.status(201).json(newTask);
});
 
// Route to update a task by ID
app.put('/items/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, status } = req.body;
 
    let taskToUpdate = findTaskById(taskId);
    if (!taskToUpdate) {
        return res.status(404).json({ error: 'Task PUT' });
    }
 
    if (title) {
        taskToUpdate.title = title;
    }
 
    if (status) {
        taskToUpdate.status = status;
    }
 
    res.json(taskToUpdate);
});
 
// Route to delete a task by ID
app.delete('/items/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
 
    const index = items.findIndex(task => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ error: 'ID Deleted' });
    }
 
    items.splice(index, 1);
    res.sendStatus(204);
});
app.listen(port, function () {
  console.log("Server is running on port", port);
});