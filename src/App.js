import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreatePresenter from './presenters/createPresenter'
import CandidateListPresenter from './presenters/candidateListPresenter'
import CandidatePresenter from './presenters/candidatePresenter'
import SearchResultsPresenter from './presenters/searchResultsPresenter'
import AboutPresenter from './presenters/aboutPresenter'
import SearchPresenter from './presenters/searchPresenter'
import LoginPresenter from './presenters/LoginPresenter'
import RegisterPresenter from './presenters/RegisterPresenter'
import { RequireAuth, AuthProvider } from './auth'

function App (props) {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<LoginPresenter />} />
          <Route path='/register' element={<RegisterPresenter />} />
          <Route path='/about' element={<AboutPresenter />} />
          <Route path='*' element={<NotFound />} />

          <Route
            path='/' element={
              <RequireAuth>
                <SearchPresenter model={props.model} />
              </RequireAuth>
            }
          />
          <Route
            path='/create' element={
              <RequireAuth>
                <CreatePresenter model={props.model} />
              </RequireAuth>
            }
          />
          <Route
            path='/list' element={
              <RequireAuth>
                <CandidateListPresenter model={props.model} />
              </RequireAuth>
            }
          />
          <Route
            path='/candidate/:id' element={
              <RequireAuth>
                <CandidatePresenter model={props.model} />
              </RequireAuth>
            }
          />
          <Route
            path='/search/:id' element={
              <RequireAuth>
                <SearchResultsPresenter model={props.model} />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

const NotFound = () => {
  return (
    <div className='container'>
      <h2>Resource not found</h2>
      <p>
        If you manually entered a web address please check if it was correct.
        If you clicked on a link or got redirected here it's probably our fault.
      </p>
      <p><Link className='text-custom-green' to='/'>Go back to the home page.</Link></p>
    </div>
  )
}

export default App
