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

// API

// GET / - main index of site
app.get('/home2', (req, res) => {
  let spoonURL =
    'https://api.spoonacular.com/food/products/search?query=spaghetti&apiKey=db0e20d328214830b47c637ba471642f'
  // Use request to call the API
  axios.get(spoonURL).then((apiResponse) => {
    let recipes = apiResponse.data.results
    res.json(recipes)
  })
})

app.get('/recipes', (req, res) => {
  res.send('Hello, YOUR RECIPES!')
})

app.listen(PORT, () => {
  console.log(' 🎧 ...listening on PORT:', PORT)
})
