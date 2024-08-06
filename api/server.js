const express = require('express');
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h1>Hello from server</h1>`)
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})

module.exports = server;