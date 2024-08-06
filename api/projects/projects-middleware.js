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

function validateProjectPost(req, res, next) {
    const { name, description, completed } = req.body
    if (!name ||
        !name.trim() ||
        !description ||
        !description.trim() ||
        !completed
    ) {
        res.status(400).json({
            message: 'Name, Description, and Completed fields are required'
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProjectPost,
}