const express = require('express')
const {
    validateActionId,
    validateActionPost,
} = require('./actions-middlware')

const Actions = require('./actions-model')

const router = express.Router()


router.get('/', async (req, res, next) => {
    try{
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})
router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})
router.post('/', validateActionPost, (req, res, next) => {
    Actions.insert({
        project_id: req.project_id,
        description: req.description,
        notes: req.notes
    })
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})
router.put('/:id', validateActionId, validateActionPost, (req, res, next) => {
    console.log('hello from PUT')
})
router.delete('/:id', validateActionId, (req, res, next) => {
    console.log('hello from DELETE')
})


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'disaster strikes in projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router