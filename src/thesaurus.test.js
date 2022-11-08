jest.mock('./apiConfig', () => {
  return {
    INTERMEDIATE_API_KEY: '',
    THESAURUS_API_KEY: ''
  }
}, { virtual: true })
// eslint-disable-next-line import/first
import { ilookup, lookup } from './thesaurus'

describe('thesaurus API library', () => {
  describe('thesaurus lookup', () => {
    test('requests correct endpoint', () => {
      window.fetch = jest.fn().mockImplementationOnce((input, init) => {
        expect(input).toMatch(/.+\/thesaurus\/json.+/)
        return Promise.resolve({ ok: true })
      })

      lookup('word')
    })

    test('deserializes response correctly', () => {
      window.fetch = jest.fn().mockImplementationOnce(mockFetch({
        ok: true,
        json: () => [{ meta: { id: 'word', syns: [['synonym']], ants: [['antonym']] } }]
      }))

      // might need to update response structure
      const data = [{
        antonyms: [['antonym']],
        id: 'word',
        synonyms: [['synonym']]
      }]

      lookup('word').then(res => {
        expect(res).toStrictEqual(data)
      })
    })

    // M-W returns a list of "similar" words if not found
    test('deserializes as expected on not found word', () => {
      window.fetch = jest.fn().mockImplementationOnce(mockFetch({
        ok: true,
        json: () => ['otherword']
      }))

      lookup('word').then(res => {
        expect(res).toStrictEqual([])
      })
    })

    test('handles errors as expected', () => {
      window.fetch = jest.fn().mockImplementationOnce(mockFetch({
        ok: true
      }))

      // TODO: error handling?
      lookup('word').then(res => {
        expect(res).toStrictEqual([])
      })
    })
  })

  describe('intermediate thesaurus lookup', () => {
    test('requests correct endpoint', () => {
      window.fetch = jest.fn().mockImplementationOnce((input, init) => {
        expect(input).toMatch(/.+\/ithesaurus\/json.+/)
        return Promise.resolve({ ok: true })
      })

      ilookup('word')
    })

    test('deserializes response correctly', () => {
      window.fetch = jest.fn().mockImplementationOnce(mockFetch({
        ok: true,
        json: () => [{ meta: { id: 'word', syns: [['synonym']], ants: [['antonym']] } }]
      }))

      // might need to update response structure
      const data = [{
        antonyms: [['antonym']],
        id: 'word',
        synonyms: [['synonym']]
      }]

      ilookup('word').then(res => {
        expect(res).toStrictEqual(data)
      })
    })

    // M-W returns a list of "similar" words if not found
    test('deserializes as expected on not found word', () => {
      window.fetch = jest.fn().mockImplementationOnce(mockFetch({
        ok: true,
        json: () => ['otherword']
      }))

      ilookup('word').then(res => {
        expect(res).toStrictEqual([])
      })
    })

    test('handles errors as expected', () => {
      window.fetch = jest.fn().mockImplementationOnce(mockFetch({
        ok: true
      }))

      // ODO: error handling?
      ilookup('word').then(res => {
        expect(res).toStrictEqual([])
      })
    })
  })
})

const mockFetch = (val) => (input, init) => Promise.resolve(val)
