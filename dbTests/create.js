const db = require('../models')

////////////////////////////////////// Create new //////////////////////////////////////
const createNewUsers = () => {
  db.user
    // .create({
    //   name: 'Steve Martin',
    //   email: 'somefakeemail01@gmail.com',
    //   bio: 'A wild and crazy guy',
    // })
    // .create({
    //   name: 'Martin Short',
    //   email: 'XOXO@gmail.com',
    //   bio: 'Comedy and Jimminy',
    // })
    // .then((user) => {
    //   console.log(user.get())
    // })
    .create({
      name: 'James Carey',
      email: 'toofunny-2323@gmail.com',
      bio: 'Short desciption on my life ...',
    })
    .then((user) => {
      console.log(user.get())
    })
}
createNewUsers()

const createNewRecipes = () => {
  db.recipe
    .create({
      recipeTitle: 'Spaghetti And Meatballs',
      userId: 1,
      recipeInstr: 'Melt butter in a large skillet over medium high heat.',
      description: 'A family favorite',
      image: 'imageHere ...',
    })

    .then((recipe) => {
      console.log(recipe.get())
    })
}
// createNewRecipes()
