const express = require('express');
const mongoose = require('mongoose')
var path = require('path');
const Article = require('./models/article')
const Project = require('./models/project')
const articleRouter = require('./routes/articles')
const projectRouter = require('./routes/projects')
const app = express();
const methodOverride = require('method-override')
const port = 8080;

const uri = 'sensitive'
mongoose
  .connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('index', { articles: articles });
})

app.get('/projectadmin', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: 'desc' })
  res.render('projects/projectindex', { projects: projects });
})

app.get('/projectspage', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: 'desc' })
  res.render('projects', { projects: projects });
})

app.get('/blogadmin', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/blogindex', { articles: articles });
})
app.get('/blog', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('blog', { articles: articles });
})
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html')
})
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html')
})

app.use('/articles', articleRouter)

app.use('/projects', projectRouter)

app.listen(port, () => console.info(`Listening on port ${port}`))