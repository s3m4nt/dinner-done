require('dotenv').config()

const db = require('./models')

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

//// Begin Routes

// GET / - main index of site
app.get('/', (req, res) => {
  // / route gets layout.ejs from views
  res.render('home')
})

// GET / - main index of site
app.get('/recipes', (req, res) => {

  // repair syntax at query strings
  const fixStr = req.query.ingredients
  const fixStr2 = fixStr.split(',').map(x => x.trim()).map(y => y.replace(/\s/g, '_')).join(',')
  let themealURL = `http://www.themealdb.com/api/json/v2/${process.env.THEMEALDB_API_KEY}/filter.php?i=${fixStr2}`
  // Use request to call the API
  axios.get(themealURL)
    .then((apiResponse) => {
      let recipes = apiResponse.data.meals
      // res.json(recipes)
      if (recipes){
      res.render('recipes', { recipes: recipes })
    }else{
      res.send(`There are no recipes containing ${fixStr} :-(`)
    }
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/new-user', (req,res) => {
// get CREATE USER form data
const newUser = req.body.userName
  db.user.create({
    name: newUser,

  })
  .then((user) => {
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get('/saved', (req, res) => {
  res.send('Here are your saved recipes')
})

app.listen(PORT, () => {
  console.log(' 🎧 ...listening on PORT:', PORT)
})
