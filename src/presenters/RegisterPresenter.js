import { useNavigate } from 'react-router-dom'
import RegisterView from '../views/RegisterView'
import { useAuth } from '../auth'
import Alert from '../components/Alert'
import { useState, useEffect } from 'react'
import SimpleSpinner from '../components/SimpleSpinner'

const RegisterPresenter = () => {
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
      const status = await auth.register({ username, password })
    } catch {
      setLoading(false)
      setMessage('Registration failed. Please try again.')
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
      <RegisterView handleUpload={handleUploadACB} />
    </>
  )
}

export default RegisterPresenter
