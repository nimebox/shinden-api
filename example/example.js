const shinden = require('../src/index.js')
const title = 'naruto'

shinden.search(title)
  .then(out => console.log(out))
  .catch(err => console.log(err))

shinden.anime('https://shinden.pl/series/11-naruto')
  .then(anime => console.log(anime))
  .catch(err => console.log(err))

shinden.players('https://shinden.pl/external-video/11-naruto/view/670')
  .then(player => {
    console.log(player.storage)
    console.log(player.playerData)
  })
  .catch(err => console.log(err))
