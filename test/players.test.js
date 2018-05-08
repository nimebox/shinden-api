jest.setTimeout(30000)

const shinden = require('../src/index.js')
const url = 'https://shinden.pl/external-video/11-naruto/view/670'

describe('GET players data', () => {
  it('should respond with players data', async () => {
    const data = await shinden.players(url)

    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.storage).not.toBeUndefined()
    expect(data.storage.APISearchService).not.toBeNull()
    expect(data.storage.APIService).not.toBeNull()
    expect(data.storage.ImgurClientId).not.toBeNull()
    expect(data.storage.NewsToNotify).not.toBeNull()
    expect(data.storage.Resources).not.toBeNull()
    expect(data.storage.XHRService).not.toBeNull()
    expect(data.storage.basic).not.toBeNull()
    expect(data.playerData).not.toBeUndefined()
    expect(data.playerData[0].json.online_id).not.toBeNull()
    expect(data.playerData[0].json.player).not.toBeNull()
    expect(data.playerData[0].json.username).not.toBeNull()
    expect(data.playerData[0].json.user_id).not.toBeNull()
    expect(data.playerData[0].json.lang_audio).not.toBeNull()
    expect(data.playerData[0].json.lang_subs).not.toBeNull()
    expect(data.playerData[0].json.max_res).not.toBeNull()
    expect(data.playerData[0].json.subs_author).not.toBeNull()
    expect(data.playerData[0].json.added).not.toBeNull()
    expect(data.playerData[0].json.source).not.toBeNull()
  })
})
