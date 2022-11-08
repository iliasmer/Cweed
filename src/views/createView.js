import FormContainer from '../components/FormContainer'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap'

const CreateView = (props) => {
  // see https://reactjs.org/docs/forms.html
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // avoid submission
    props.handleUpload({ name, email, phone, content })
  }

  return (
    <div className='container'>
      <FormContainer>
        <Form className='shadow' onSubmit={handleSubmit}>
          <h4 className='bg-dark text-white p-3'>Create new candidate</h4>
          <Form.Group className='px-3 pt-3'>
            <Form.Label htmlFor='name'>Name</Form.Label>
            <Form.Control
              required
              id='name'
              type='text'
              onChange={({ target }) => setName(target.value)}
              value={name}
              placeholder='Enter Candidate Name...'
            />
          </Form.Group>
          <Row className='px-3 pt-3'>
            <Col lg={6} className='pb-lg-0 pb-3'>
              <Form.Group>
                <Form.Label htmlFor='phone'>Number</Form.Label>
                <Form.Control
                  required
                  id='phone'
                  type='tel'
                  onChange={({ target }) => setPhone(target.value)}
                  value={phone}
                  placeholder='Enter Candidate´s Phone Number...'
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group>
                <Form.Label htmlFor='email'>E-mail</Form.Label>
                <Form.Control
                  required
                  id='email'
                  type='email'
                  onChange={({ target }) => setEmail(target.value)}
                  value={email}
                  placeholder='Enter Candidate´s E-mail...'
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='px-3 pt-3'>
            <Form.Label htmlFor='content'>Resume</Form.Label>
            <Form.Control
              required
              id='content'
              onChange={({ target }) => setContent(target.value)}
              value={content}
              as='textarea'
              rows={8}
              placeholder='Enter Candidate´s Resume Text...'
            />
          </Form.Group>
          <Form.Group className='text-center p-3 pb-3'>
            <button className='btn btn-dark btn-block' type='submit'>Upload</button>
          </Form.Group>
        </Form>
      </FormContainer>
    </div>
  )
}

export default CreateView
