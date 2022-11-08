import { useNavigate } from 'react-router-dom'
import LoginView from '../views/LoginView'
import { useAuth } from '../auth'
import Alert from '../components/Alert'
import { useState, useEffect } from 'react'
import SimpleSpinner from '../components/SimpleSpinner'

const LoginPresenter = () => {
  const navigate = useNavigate()
  const [errorMessage, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = useAuth()

  const handleUploadACB = async (data) => {
    setLoading(true)
    setMessage('')
    const username = data.email
    const password = data.password
    try {
      const status = await auth.login({ username, password })
    } catch {
      setLoading(false)
      setMessage('The password is invalid or the user does not have an account.')
    }
  }

  useEffect(() => {
    if (auth.user) {
      setLoading(false)
      navigate('/')
    }
  }, [auth])

  return (
    <>
      {loading && <SimpleSpinner />}
      {errorMessage && errorMessage.length > 0 && (
        <Alert className='alert alert-danger alert-dismissible fade show' alertText={errorMessage} />
      )}
      <LoginView handleUpload={handleUploadACB} />
    </>
  )
}

export default LoginPresenter
