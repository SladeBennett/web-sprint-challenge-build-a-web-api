const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Hello from server</h1>`)
})


server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})

module.exports = server;