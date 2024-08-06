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

function validateActionPost(req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id ||
        !project_id.trim() ||
        !description ||
        !description.trim() ||
        !notes ||
        !notes.trim()
    ) {
        res.status(400).json({
            message: 'Project Id, Description, and Notes fields are required'
        })
    } else {
        req.project_id = project_id.trim()
        req.description = description.trim()
        req.notes = notes.trim()
        next()
    }
}

module.exports = {
    validateActionId,
    validateActionPost,
}