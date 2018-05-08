# shinden-api [![Build Status](https://travis-ci.org/Nimebox/shinden-api.svg?branch=master)](https://travis-ci.org/Nimebox/shinden-api)
Unofficial api for
https://shinden.pl

## Install shinden-api
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
[ [ { url: 'https://shinden.pl/series/11-naruto' },
  { url: 'https://shinden.pl/series/44471-boruto-naruto-the-movie' },
  { url: 'https://shinden.pl/series/49778-boruto-naruto-next-generations' },
  { url: 'https://shinden.pl/series/12055-naruto-shippuuden-movie-5-blood-prison' },
  { url: 'https://shinden.pl/series/9452-naruto-the-cross-roads' },
  { url: 'https://shinden.pl/manga/540-naruto' },
  { url: 'https://shinden.pl/manga/10548-naruto-pilot' },
  { url: 'https://shinden.pl/manga/46059-boruto-naruto-next-generations' },
  { url: 'https://shinden.pl/manga/49976-naruto-hiden' },
  { url: 'https://shinden.pl/manga/10214-naruto-shiro-no-douji-keppu-no-kijin' } ]
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

### [W.I.P] Video url scraped from player

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
