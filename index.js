require('dotenv').config()

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

// GET / - main index of site
app.get('/home2', (req, res) => {
  let themealURL = `www.themealdb.com/api/json/v1/1/filter.php?i=${req.body.ingredients}`
  console.log('💀💀💀💀💀💀💀💀',req.body.ingredients)
  // Use request to call the API
  axios.get(themealURL)
    .then((apiResponse) => {
      let recipes = apiResponse.data.meals[0]
      // res.json(recipes)
      res.render('home2', { recipes: recipes })
    })
    .catch((err) => {
      console.log('🔥🔥🔥🔥🔥🔥🔥🔥', err)
    })
})

app.get('/results', (req, res) => {
  res.send('Hello, YOUR query results are here!')
})

app.listen(PORT, () => {
  console.log(' 🎧 ...listening on PORT:', PORT)
})
