const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: 'Action not found'
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Problems finding action'
        })
    }
}

module.exports = {
    validateActionId,
}