import { INTERMEDIATE_API_KEY as IKEY, THESAURUS_API_KEY as TKEY } from './apiConfig'

/** @module thesaurus */

const BASE_URL = 'https://www.dictionaryapi.com/api/v3/references/'

/**
 * Performs a GET on the thesaurus API and returns a
 * promise representing the JSON response.
 * @param {string} endpoint
 * @param {*} params
 * @returns {Promise<*>}
 */
const get = (endpoint, params) => {
  const url = new URL(endpoint, BASE_URL)
  url.search = new URLSearchParams(params).toString()
  return window.fetch(url.toString(), {
    method: 'GET',
    mode: 'no-cors'
  }).then(handleRes)
}

/**
 * Handles a response and returns a promise representing
 * the JSON response. Throws if the response status is not
 * successful (2xx).
 * @param {Response} res
 * @returns {Promise<*>}
 */
const handleRes = (res) => {
  if (!res.ok) {
    throw new Error(res.status) // (error handling) do we have useful details?
  }

  // the M-W API returns everything as 200-OK with a string as
  //  error response, this fails on error responses, has to be handled
  //  here or somewhere else (see onError).
  return res.json()
}

/**
 * Looks up a word in the thesaurus, and returns a
 * promise representing the JSON response.
 * @example
 * // returns a promise representing the API response
 * lookup('hello')
 * @example
 * // example response (success)
 * [
 *   {
 *     "id": "hello",
 *     "synonyms": [["greeting", "salutation", "salute", "welcome"]],
 *     "antonyms": [["adieu", "bon voyage", "congé", "farewell", "Godspeed", "good-bye"]]
 *   }
 * ]
 * @example
 * // example response (error/not found)
 * []
 * @param {string} word
 * @returns {Promise<*>}
 */
const lookup = (word) => {
  // do we need validation?
  return get(`thesaurus/json/${word}`, { key: TKEY })
    .then(fromDto)
    .catch(onError)
}

/**
 * Looks up a word in the intermediate thesaurus, and returns a
 * promise representing the JSON response, see {@link lookup}
 * for usage.
 * @param {string} word
 * @returns {Promise<*>}
 */
const ilookup = (word) => {
  return get(`ithesaurus/json/${word}`, { key: IKEY })
    .then(fromDto)
    .catch(onError)
}

/**
 * Converts the API response JSON to a common representation of
 * the response objects.
 * @param {*} json
 * @returns {*}
 */
const fromDto = (json) => {
  // here we have to do some *magic*. M-W returns a simple list of words
  // to use as "alternative search recommendations" if our search string
  // is not found, so we have to check for that too.
  // we could use this (debounced) for search recs somehow?
  return json
    .filter(entry => entry?.meta)
    .map(({ meta }) => ({
      // define object structure
      id: meta.id,
      synonyms: meta.syns,
      antonyms: meta.ants
    }))
}

// decide if/how we want to handle errors
const onError = (err) => { console.warn(err); return [] }

export {
  lookup,
  ilookup
}
