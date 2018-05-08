jest.setTimeout(100000)

const shinden = require('../src/index.js')
const url = 'https://shinden.pl/series/11-naruto'

describe('GET anime data', () => {
  it('should respond with anime data', async () => {
    const data = await shinden.anime(url)

    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.title).not.toBeNull()
    expect(data.number).not.toBeNull()
    expect(data.airDate).not.toBeNull()
    expect(data.url).not.toBeNull()
  })
})
