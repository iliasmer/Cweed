# Getting started

## Requirements

* Firebase configuration file (`src/firebaseConfig.js`, Git-ignored). See firebase documentation.
* API configuration file (`src/apiConfig.js`, Git-ignored, example shown below) used in API library, exporting
  * `THESAURUS_API_KEY`; API key for https://www.dictionaryapi.com/products/api-collegiate-thesaurus 
  * `INTERMEDIATE_API_KEY`; API key for https://www.dictionaryapi.com/products/api-intermediate-thesaurus

Example API configuration file

```js
const INTERMEDIATE_API_KEY = '...'
const THESAURUS_API_KEY = '...'

export {
  INTERMEDIATE_API_KEY,
  THESAURUS_API_KEY
}
```

## Setup

* Clone the repository
* `npm install`
* `npm start`; runs the app in the development mode
* `npm test`; runs all tests

## Deploy application

Requires Firebase configuration.

* Run `npm run build` (builds the project)
* Run `firebase deploy` (deploys to firebase)
