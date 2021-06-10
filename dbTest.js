const db = require('./models')

////////////////////////////////////// Create new //////////////////////////////////////
const createNewUsers = () => {
  db.user
    .create({
      name: 'Brian Young',
      email: 'berkshirehunt@gmail.com',
      bio: 'A little bit about myself',
    })

    .then((user) => {
      console.log(user.get())
    })
}
createNewUsers()

const createNewRecipes = () => {
  db.recipe
    .create({
      recipeTitle: 'Linguine Con Vongole',
      userId: 1,
      recipeInstr:
        'Melt butter in a large skillet over medium high heat. Add garlic and cook, stirring frequently, until fragrant, about 1-2 minutes.',
      description:
        'A delicious pasta dish featuring clams and linguine in a white wine sauce',
      image:
        'https://www.the-pasta-project.com/wp-content/uploads/linguine-pasta-alle-vongole-linguine-with-clams-15-500x480.jpg',
    })

    .then((recipe) => {
      console.log(recipe.get())
    })
}
createNewRecipes()

////////////////////////////////////// Destroy //////////////////////////////////////
// db.recipes
//   .destroy('`name` LIKE "pikachuuuTEST"')
//   .then(() => {
//     console.log('👺 Deleted: ')
//   })
//   .catch((err) => {
//     console.log(err, 'Promise error👺👺')
//     // done();
//   })
