import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeModelFromFirebase, updateModelFromFirebase, updateFirebaseFromModel } from './firebaseModel'
import CweedModel from './CweedModel'
import SimpleSpinner from './components/SimpleSpinner'

const ReactRoot = () => {
  const [model, setModel] = React.useState(new CweedModel()) // ignore initial, empty model
  const [wait, setWait] = useState(true)

  React.useEffect(() => {
    const initialize = () => {
      initializeModelFromFirebase()
        .then(updateFirebaseFromModel)
        .then(updateModelFromFirebase)
        .then((model) => {
          setModel(model)
          setWait(false)
        })
    }
    initialize()
  }, [])
  return (
    <React.StrictMode>
      {wait ? <SimpleSpinner /> : <App model={model} />}
    </React.StrictMode>
  )
}

ReactDOM.render(
  <ReactRoot />,
  document.getElementById('root')
)
