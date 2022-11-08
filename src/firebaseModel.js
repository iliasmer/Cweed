import firebaseConfig from './firebaseConfig'
import CweedModel from './CweedModel'
import firebase from 'firebase/app'
import 'firebase/database'

// init app and DB
firebase.initializeApp(firebaseConfig)
//  REF is the "root” Firebase realtime DB path
const REF = 'model' // FIXME: ♫ rename me maybe

/**
 * Bind model to firebase data.
 * @param model
 * @return {*}
 */
const updateModelFromFirebase = (model) => {
  // new candidate inserted in DB
  firebase.database().ref(`${REF}/candidates`).on('child_added', (data) => {
    model.addCandidate({ id: data.key, candidate: data.val() })
  })

  // new search inserted in DB
  firebase.database().ref(`${REF}/searches`).on('child_added', (data) => {
    model.addSearch({ id: data.key, search: data.val() })
  })
  return model
}

/**
 * Bind firebase data to model.
 * @param model
 * @return {*}
 */
const updateFirebaseFromModel = (model) => {
  // Observer for model changes.
  const observer = (payload) => {
    // We expect either a new candidate (CV) or a new search (with results).
    // For now using two fields in the payload to decide which one it is.
    if (!payload) {
      return // nothing to do..
    }

    // addCandidate field set, expecting an id and some data to store
    if (payload.addCandidate) {
      const { id, candidate } = payload.addCandidate
      firebase.database().ref(`${REF}/candidates/${id}`).set(candidate)
    }

    // addCandidate field set, expecting a date, an id and some data to store
    if (payload.addSearch) {
      const { id, search } = payload.addSearch
      firebase.database().ref(`${REF}/searches/${id}`).set(search)
    }
  }

  model.addObserver(observer)
  return model
}

/**
 * Create initial model from existing firebase data.
 * @return {Promise<CweedModel>}
 */
const initializeModelFromFirebase = () => {
  return firebase.database().ref(REF) // get whole object in storage
    .once('value')
    .then(createModel)
}

const createModel = (firebaseData) => {
  // get data from firebase data object (value)
  const data = firebaseData.val()
  const candidates = data?.candidates || {}
  const searches = data?.searches || {}
  return new CweedModel(candidates, searches)
}

export {
  updateFirebaseFromModel,
  updateModelFromFirebase,
  initializeModelFromFirebase
}
