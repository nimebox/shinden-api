const x = require('x-ray')()
const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')
const _ = require('lodash')
const Nightmare = require('nightmare')
const cookieJar = new tough.CookieJar()
axiosCookieJarSupport(axios)

const api = axios.create({
  jar: cookieJar,
  withCredentials: true
})
const BASE_URL = 'https://shinden.pl'
const SEARCH_URL = 'https://shinden.pl/search?&q='

const nightmare = Nightmare({
  show: false
})

const search = async title => {
  const response = await api.get(SEARCH_URL + title)
  return new Promise((resolve, reject) => {
    x(response.data, {
      url: ['td[class=desc-col] > h3 > a@href'],
      json: ['tr@data']
    })((err, obj) => {
      if (err) {
        reject(err)
      }

      const out = _.compact(obj.json).map((el, i) => ({
        url: BASE_URL + obj.url[i],
        json: JSON.parse(el)
      }))
      resolve(out)
    })
  })
}

const anime = async url => {
  const response = await api.get(url + '/all-episodes')
  return new Promise((resolve, reject) => {
    x(response.data, {
      url: ['tbody[class=list-episode-checkboxes] > tr > td[class=button-group] > a@href'],
      title: ['tbody[class=list-episode-checkboxes] > tr > td[class=ep-title]'],
      number: ['tbody[class=list-episode-checkboxes] > tr > td:nth-child(1)'],
      airDate: ['tbody[class=list-episode-checkboxes] > tr > td:nth-child(5)'],
      infoType: 'dl[class=info-aside-list] > dd:nth-of-type(1)',
      infoStatus: 'dl[class=info-aside-list] > dd:nth-of-type(2)',
      infoAirDate: 'dl[class=info-aside-list] > dd:nth-of-type(3)',
      infoEndDate: 'dl[class=info-aside-list] > dd:nth-of-type(4)',
      infoEpisodes: 'dl[class=info-aside-list] > dd:nth-of-type(5)',
      infoDuration: 'dl[class=info-aside-list] > dd:nth-of-type(6)',
      infoMPAA: 'dl[class=info-aside-list] > dd:nth-of-type(7)'
    })((err, obj) => {
      if (err) {
        reject(err)
      }

      const info = {
        type: obj.infoType,
        status: obj.infoStatus,
        airDate: obj.infoAirDate,
        endDate: obj.infoEndDate,
        episodes: obj.infoEpisodes,
        duration: obj.infoDuration,
        MPAA: obj.infoMPAA
      }

      const episodes = _.compact(obj.url).map((el, i) => ({
        title: obj.title[i],
        number: obj.number[i],
        airDate: obj.airDate[i],
        url: BASE_URL + el
      }))

      const anime = {
        info: info,
        episodes: episodes
      }

      resolve(anime)
    })
  })
}

const headless = async (...args) => {
  const url = args[0]
  const onlineId = args[1]
  await nightmare.goto(url)
  const body = await nightmare.evaluate(() => document.querySelector('body').innerHTML)
  let click = null
  if (onlineId !== undefined) {
    click = await nightmare.click('#player_data_' + onlineId)
      .wait(8000)
      .evaluate(() => document.querySelector('#player-block').innerHTML)
      .evaluate(() => {
        return [...document.querySelectorAll('iframe')].map(el => ({
          src: el.getAttribute('src')
        }))
      })
  }

  const storage = await nightmare.evaluate(() => _Storage)
  await nightmare.end()

  return { body, storage, click }
}

const players = async (url) => {
  const response = await headless(url)
  return new Promise((resolve, reject) => {
    x(response.body, {
      playerData: ['td[class="ep-buttons"] > a@data-episode']
    })((err, obj) => {
      if (err) {
        reject(err)
      }

      const playerData = _.compact(obj.playerData).map((el, i) => ({
        json: JSON.parse(el)
      }))

      const out = {
        storage: response.storage,
        playerData: playerData
      }

      resolve(out)
    })
  })
}

const video = async (url, onlineId) => {
  const response = await headless(url, onlineId)
  return response.click[2]
}

module.exports = {
  search,
  anime,
  players,
  video
}
