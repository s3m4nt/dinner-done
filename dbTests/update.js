const db = require('../models')

////////////////////////////////////// UPDATE EXISTING ///////////////////////////////////

const updateUsers = () => {
  db.user
    .update({ name: 'Brian David Young' }, { where: { name: 'Brian Young' } })

    .then((user) => {
      console.log(user)
    })
}
updateUsers()
