# shinden-api
Unofficial api for
https://shinden.pl

## Install animesub-api
    npm install shinden-api --save
    
## Usage
### Search

```javascript
const shinden = require('shinden-api')
const title = 'naruto'

shinden.search(title).then((out) => {
  console.log(out)
}).catch((err) => {
  console.log(err)
})

```
#### output
```js
[ { url: 'https://shinden.pl/series/11-naruto',
    json:
     { ranking_rate: '8.592966079871475',
       rating_titlecahracters: 8.791644349223352,
       kind: 'TV',
       rating_total_cnt: 3930,
       title_id: '11',
       title: 'Naruto',
       type: 'Anime',
       episode_time: 23,
       rating_total: 8.583206106870229,
       rating_titlecahracters_cnt: 3734,
       rating_music: 8.531812080536913,
       rating_graphics_cnt: 3728,
       rating_story: 8.695512820512821,
       genres: [Array],
       obj: 'anime',
       rating_music_cnt: 3725,
       online: '875',
       rating_story_cnt: 3744,
       ranking_position: 86,
       rating_graphics: 7.9959763948497855,
       cover_artifact_id: 171942,
       episodes: 220,
       title_status: 'Finished Airing',
       _highlight: [Object],
       hl_title: '<em>Naruto</em>' } }
]
```

### Anime info

```javascript
const shinden = require('shinden-api')
const url = 'https://shinden.pl/series/11-naruto'

shinden.anime(url)
  .then(anime => console.log(anime))
  .catch(err => console.log(err))


```

#### output
```js
{ title: 'Walki na wielu frontach',
       number: '121',
       airDate: '2005-02-09',
       url: 'https://shinden.pl/external-video/11-naruto/view/571' },
     ... 120 more items ] }
```

### Players data

```javascript
const shinden = require('shinden-api')
const url = 'https://shinden.pl/external-video/11-naruto/view/670'

shinden.players(url)
  .then(player => {
    console.log(player)
  })
  .catch(err => console.log(err))

```

#### output
```js
{ APISearchService: '//v3.api.shinden.pl/api',
  APIService: '/api',
  Resources: '/res',
  XHRService: '//v3.api.shinden.pl/xhr',
  basic: 'tokenhere' }
[ { json:
     { online_id: '291352',
       player: 'Mp4upload',
       username: '',
       user_id: '1',
       lang_audio: 'jp',
       lang_subs: 'pl',
       max_res: '480p',
       subs_author: '',
       added: '2016-11-26 20:07:03',
       source: 'http://www.animezone.pl/odcinki-online/naruto/220' } },
```

### Video url scraped from player

```javascript
const shinden = require('shinden-api')
const url = 'https://shinden.pl/external-video/11-naruto/view/670'
const onlineId = '291351'

shinden.video(url, onlineId)
  .then(video => {
    console.log(video)
  })
  .catch(err => console.log(err))


```
#### output
```js
{ src: 'https://drive.google.com/file/d/0B3JCK0IyS_RWbHFBNTBkREtIWFU/preview' }
```