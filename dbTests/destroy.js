const db = require('../models')

////////////////////////////////////// DESTROY //////////////////////////////////////

const destroyUser = () => {
  db.user
    .destroy(
      // .destroy('`name` LIKE "Steve*"')
      { where: { id: 5 } }
    )
    .then(() => {
      console.log('👺 Deleted: ')
    })
    .catch((err) => {
      console.log(err, '👺Promise error👺')
    })
}
destroyUser()

//   db.pokemon
//   .destroy('`name` LIKE "pikachuuuTEST"')
//   .then(() => {
//     console.log('👺 Deleted: ')
//   })
//   .catch((err) => {
//     console.log(err, 'Promise error👺👺')
//     // done();
//   })
