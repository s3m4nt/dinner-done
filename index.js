const express = require('express')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))
app.use(methodOverride('_method'))

// GET / - main index of site
app.get('/', (req, res) => {
  // / route gets layout.ejs from views
  res.render('home')
})

app.get('/recipes', (req, res) => {
  res.send('Hello, YOUR RECIPES!')
})

app.listen(PORT, () => {
  console.log(' 🎧 ...listening on', PORT)
  // rowdyResults.print();
})
