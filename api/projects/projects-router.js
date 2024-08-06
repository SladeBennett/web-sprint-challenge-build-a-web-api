const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('hello from GET')
})
router.get('/:id', (req, res, next) => {
    console.log('hello from GET ID')
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
router.get('/:id/actions', (req, res, next) => {
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