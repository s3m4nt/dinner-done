require('dotenv').config()

const db = require('./models')

const express = require('express')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const app = express()
const PORT = process.env.PORT || 3000
// const server  = app.listen(PORT);

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))
app.use(methodOverride('_method'))

//// Begin Routes

// GET / - main index of site
app.get('/', (req, res) => {
  // root route gets layout.ejs from views
  res.render('home')
})

app.get('/recipes', (req, res) => {
  // repair odd syntax at query strings
  const fixStr = req.query.ingredients
  const fixStr2 = fixStr.split(',').map(x => x.trim()).map(y => y.replace(/\s/g, '_')).join(',')
  let themealURL = `http://www.themealdb.com/api/json/v2/${process.env.THEMEALDB_API_KEY}/filter.php?i=${fixStr2}`
  // Use request to call the API
  axios.get(themealURL)
    .then((apiResponse) => {
      let recipes = apiResponse.data.meals
      // res.json(recipes)
if (recipes === null) {

    let noRecipe = true

// Pass variable to front end
    res.render('next');

} else {
      res.render('recipes', { recipes: recipes })
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

app.post('/updateRecipe/:userName/:id/:title', async (req,res) =>{
  try{
    const title = decodeURIComponent(req.params.title)
await db.recipe.update({
  title: title,
}, {
  where: {
    id: req.params.id,
  }
})


    res.sendStatus(200);
  }
  catch(err){
    console.log(err);
    res.sendStatus(400);
  }
})

app.post('/deleteRecipe/:userName/:id', async (req,res) =>{
  try{
    await db.recipe.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.sendStatus(200);
  }
  catch(err){
    console.log(err);
    res.sendStatus(400);
  }
})

app.post('/saveRecipe/:userName/:idMeal', async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        name: req.params.userName
      }
    })
    if (!user) {
      throw new Error("No user found!")
    }

    let themealURL = `http://www.themealdb.com/api/json/v2/${process.env.THEMEALDB_API_KEY}/lookup.php?i=${req.params.idMeal}`
  // Use request to call the API
  const apiResponse = await axios.get(themealURL)
  const {
    strMeal,
    strMealThumb,
    strYoutube,
    strSource,
  } = apiResponse.data.meals[0]

    await db.recipe.create({
      idMeal: req.params.idMeal,
      userId: user.id,
      title: strMeal,
      image: strMealThumb,
      video: strYoutube,
      source: strSource,
    })

    res.sendStatus(200);
  } catch (error) {
    console.log(error)
    res.sendStatus(400);
  }
  // .then((user) => {
  //   res.redirect('/')
  // })
  // console.log(err)
})
  // console.log(req.params.userName, req.params.idMeal)
  app.get('/saved/:userName', async (req, res) => {

try{
  const user = await db.user.findOne({
    where: {
      name: req.params.userName
    }
  })
  if (!user) {
    throw new Error("No user found!")
  }

const recipes = await db.recipe.findAll({
  where: {
    userId: user.id
  }
})

res.render('saved', { recipes: recipes })

}
catch(err){
  console.log(err);
  res.sendStatus(400);
}

  })


app.listen(PORT, () => {
  console.log(' 🎧 ...listening on PORT:', PORT)
})
