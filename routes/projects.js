const express = require('express')
const Project = require('./../models/project')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('projects/new', { project: new Project() })
})

router.get('/', async (req, res) => {
  try {
    const allProjects = await Project.find()
    res.json(allProjects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/edit/:id', async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.render('projects/edit', { project: project })
})

router.get('/:slug', async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug })
  if (project == null) res.redirect('/')
  res.render('projects/show', { project: project })
})

router.post('/', async (req, res, next) => {
  req.project = new Project()
  next()
}, saveProjectAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.project = await Project.findById(req.params.id)
  next()
}, saveProjectAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id)
  res.redirect('/projectadmin')
})

function saveProjectAndRedirect(path) {
  return async (req, res) => {
    let project = req.project
    project.title = req.body.title
    project.category = req.body.category
    project.description = req.body.description
    project.quote = req.body.quote
    project.markdown = req.body.markdown
    project.imageUrl = req.body.imageurl
    project.github = req.body.github
    project.website = req.body.website
    try {
      project = await project.save()
      res.redirect(`/projects/${project.slug}`)
    } catch (e) {
      res.render(`projects/${path}`, { project: project })
    }
  }
}

module.exports = router