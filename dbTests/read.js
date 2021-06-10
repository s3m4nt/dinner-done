const db = require('../models')

////////////////////////////////////// READ //////////////////////////////////////

const findUser = () => {
  db.user
    .findOne({
      where: {
        name: 'Brian D Young',
      },
    })
    .then((usr) => {
      console.log('💀 Found: ', usr.name)
    })
}
findUser()
