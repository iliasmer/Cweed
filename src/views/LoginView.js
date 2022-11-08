import FormContainer from '../components/FormContainer'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const LoginView = (props) => {
  // see https://reactjs.org/docs/forms.html
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault() // avoid submission
    props.handleUpload({ email, password })
  }

  return (
    <div className='container'>
      <FormContainer>
        <Form className='shadow' onSubmit={handleSubmit}>
          <h4 className='bg-dark text-white p-3'>Log In</h4>

          <Form.Group className='px-3 pt-3'>
            <Form.Label htmlFor='email'>E-mail</Form.Label>
            <Form.Control
              required
              id='email'
              type='email'
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              placeholder='Input email..'
            />
          </Form.Group>

          <Form.Group className='px-3 pt-3'>
            <Form.Label htmlFor='email'>Password</Form.Label>
            <Form.Control
              required
              id='password'
              type='password'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              placeholder='Input password..'
            />
          </Form.Group>

          <Form.Group className='text-center p-3 pb-3'>
            <Form.Group className='text-center p-3 pb-3'>
              <button className='btn btn-dark btn-lg center' type='submit'>Log in</button>
            </Form.Group>
            <Form.Text>
              <p>
                You do not have an account?
                Register <Link className='text-custom-green' to='/register'>here</Link>.
              </p>
            </Form.Text>
          </Form.Group>
        </Form>
      </FormContainer>
    </div>
  )
}

export default LoginView
