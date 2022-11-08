import { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Navigate } from 'react-router-dom'

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [wait, setWait] = useState(true)

  const login = ({ username, password }) => {
    return firebase.auth().signInWithEmailAndPassword(username, password)
  }

  const register = ({ username, password }) => {
    return firebase.auth().createUserWithEmailAndPassword(username, password)
  }

  const logout = () => {
    return firebase.auth().signOut()
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setWait(false)
    })
  })

  const value = { user, login, logout, register }

  return (
    <AuthContext.Provider value={value}>
      {!wait && children}
    </AuthContext.Provider>
  )
}

const RequireAuth = ({ children }) => {
  const auth = useAuth()

  if (!auth.user) {
    return <Navigate to='/login' />
  }

  return children
}

export {
  AuthProvider, RequireAuth, useAuth
}
