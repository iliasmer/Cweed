import { render, screen } from '@testing-library/react'
import { createContext, useContext } from 'react'
import App from './App'
import CweedModel from './CweedModel'

// mock auth
const MockContext = createContext(null)
const useAuth = () => useContext(MockContext)
const RequireAuth = ({ children }) => children
jest.mock('./auth', () => {
  const AuthProvider = ({ children }) => {
    const user = { uid: 'uid' }
    const value = {
      user,
      login: () => Promise.resolve(user),
      logout: () => Promise.resolve(),
      register: () => Promise.resolve(user)
    }
    return (<MockContext.Provider value={value}>{children}</MockContext.Provider>)
  }

  return { RequireAuth, useAuth, AuthProvider }
})

// test model
const model = new CweedModel({}, {})

test('renders home page', () => {
  render(<App model={model} />)
  const searchBtn = screen.getByRole('button', { name: 'Search' })
  expect(searchBtn).toBeInTheDocument()
})
