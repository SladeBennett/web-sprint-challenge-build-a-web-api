const express = require('express')
const {
    validateActionId
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
router.get('/:id', validateActionId, (req, res, next) => {
    res.json(req.action)
})
router.post('/', (req, res, next) => {
    console.log('hello from POST')
})
router.put('/:id', (req, res, next) => {
    console.log('hello from PUT')
})
router.delete('/:id', (req, res, next) => {
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