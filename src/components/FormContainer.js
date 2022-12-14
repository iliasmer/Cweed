import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container className='formContainer'>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
