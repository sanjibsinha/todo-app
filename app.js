// app.js

const express = require('express');
const app = express();
const port = 3000;
// Middleware to serve static files (like CSS)
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Sample To-Do list data (could be replaced with database later)
let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Create a To-Do App', completed: false },
];

// Home route to display the To-Do list
app.get('/', (req, res) => {
  res.render('index', { todos: todos });
});

// Route to handle adding new tasks
app.post('/add', express.urlencoded({ extended: true }), (req, res) => {
  const task = req.body.task;
  todos.push({ id: todos.length + 1, task: task, completed: false });
  res.redirect('/');
});

// Route to handle task completion
app.post('/complete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) todo.completed = true;
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});