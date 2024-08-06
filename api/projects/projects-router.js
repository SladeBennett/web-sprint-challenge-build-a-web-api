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
    Projects.insert({ name: req.name, description: req.description, completed: true })
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(next)
})
router.put('/:id', validateProjectId, validateProjectPost, (req, res, next) => {
    Projects.update(req.params.id, { name: req.name, description: req.description, completed: true })
        .then(() => {
            const result = Projects.get(req.params.id)
            res.status(200).json(result)
        })
        .catch(next)
})
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const deleted = await Projects.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (err) {
        next(err)
    }
})
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})
router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'disaster strikes in projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router