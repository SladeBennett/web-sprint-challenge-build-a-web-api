const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: 'project not found'
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Problems finding project'
        })
    }
}

module.exports = {
    validateProjectId,
}