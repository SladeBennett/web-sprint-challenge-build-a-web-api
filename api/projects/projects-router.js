const express = require('express')
const {
    validateProjectId,
    validateProjectPost
} = require('./projects-middleware')

const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})
router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})
router.post('/', validateProjectPost, (req, res, next) => {
    Projects.insert({ name: req.name, description: req.description })
    .then(newPost => {
        res.status(201).json(newPost)
    })
    .catch(next)
})
router.put('/:id', validateProjectId, (req, res, next) => {
    console.log('hello from PUT')
})
router.delete('/:id', validateProjectId, (req, res, next) => {
    console.log('hello from DELETE')
})
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    console.log('hello from GET ACTIONS')
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'disaster strikes in projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router