jest.setTimeout(100000)

const shinden = require('../src/index.js')
const title = 'naruto'

describe('SEARCH anime', () => {
  it('should respond with urls', async () => {
    const data = await shinden.search(title)

    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.url).not.toBeNull()
  })
})
