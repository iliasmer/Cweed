import { v4 as uuidv4 } from 'uuid'
import { ilookup } from './thesaurus'

/**
 * Generate an ID. Use this to generate IDs used for storing entries in DB.
 * @example
 * generateId() // => '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
 * @return {string}
 */
const generateId = () => {
  return uuidv4()
}

// Generates the date the new search was performed.
const generateDate = () => {
  const today = new Date()
  const dateString = today.toString()
  const timeStamp = dateString.slice(0, 24)

  return timeStamp
}

class CweedModel {
  constructor (candidates = {}, searches = {}) {
    this.searches = searches
    this.candidates = candidates
    this.observers = []
  }

  // Perform a new search.
  async doSearch (terms) {
    // helper to extract all synonyms and antonyms from a lookup result
    const unpack = (term, result) => {
      // helper, flattens a list of lists
      const flatten = (listOfLists) => Array.prototype.concat.apply([], listOfLists)

      // results, using sets to avoid duplicates
      const syns = new Set([term.toLowerCase()])
      const ants = new Set()

      // extract all synonyms and antonyms from the result entries (including id)
      result.forEach(({ synonyms, antonyms }) => {
        flatten(synonyms).forEach((s) => syns.add(s.toLowerCase()))
        flatten(antonyms).forEach((a) => ants.add(a.toLowerCase()))
      })

      return { syns, ants }
    }

    // get results for all terms and unpack synonyms and antonyms into sets
    const promises = terms.map((term) => {
      return ilookup(term).then((result) => unpack(term, result))
    })
    const resultSets = await Promise.all(promises)

    // synonym and antonym sets
    const synonyms = new Set()
    const antonyms = new Set()

    resultSets.forEach(({ syns, ants }) => {
      syns.forEach((s) => synonyms.add(s))
      ants.forEach((a) => antonyms.add(a))
    })

    // FIXME: antonyms ignored for now (might use to subtract score)

    // build search results
    const results = Object.entries(this.candidates)
      // iterate over all candidates
      .map(([id, candidate]) => {
        // build a set of unique words from each candidate's CV
        const set = new Set([...candidate.content
          .match(/\w+(?:'\w+)*/g)]
          .map(w => w.toLowerCase()))

        // intersect each candidate's CV set with the set of synonyms
        const score = [...synonyms].filter(synonym => set.has(synonym)).length

        // return search result object
        return { id, score }
      })
      // filtering candidates with score of zero or less
      .filter(res => res.score > 0)

    const date = generateDate()
    const search = { terms, results, date }
    const id = generateId()

    // store search
    this.addSearch({ date, id, search })

    return id // used for redirect by presenter
  }

  // Returns the list of candidates.
  getCandidates () {
    return Object.entries(this.candidates)
      .map(([id, candidate]) => ({ id, candidate }))
  }

  // Returns the list of searches.
  getSearches () {
    return Object.entries(this.searches)
      .map(([id, search]) => ({ id, search }))
  }

  // Finds a candidate with {@link id}
  getCandidate (id) {
    //  Can be updated to "return { id, candidate: this.candidates.id }"
    return this.candidates[id]
  }

  // Finds a search with {@link id}.
  getSearch (id) {
    return this.searches[id]
  }

  // Adds a candidate (CV).
  addCandidate ({ id, candidate }) {
    // do not add candidate if already in list (avoids duplicates)
    if (id && this.candidates[id]) {
      return id
    }

    // generate id if not set
    if (!id) {
      id = generateId()
    }

    this.candidates[id] = candidate
    this.notifyObservers({ addCandidate: { id, candidate } })
    return id
  }

  // Adds a search.
  addSearch ({ id, search }) {
    // do not add search if already in list (avoids duplicates)
    if (id && this.searches[id]) {
      return
    }

    // generate id if not set
    if (!id) {
      id = generateId()
    }

    this.searches[id] = search
    this.notifyObservers({ addSearch: { id, search } })
  }

  // Adds {@link callback} to the observers array.
  addObserver (callback) {
    this.observers = [...this.observers, callback]
  }

  // Removes {@link callback} from the observers array.
  removeObserver (callback) {
    this.observers = this.observers.filter((obs) => obs !== callback)
  }

  // Calls all the callbacks in the observers array.
  notifyObservers (payload) {
    this.observers.forEach((obs) => {
      try {
        obs(payload)
      } catch (err) {
        console.error(err) // TODO: error handling
      }
    })
  }
}

export default CweedModel
