import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'

const Header = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  function logOutACB () {
    auth.logout().then((res) => navigate('/login'))
  }

  function goToLoginACB () {
    navigate('/login')
  }

  const isActive = (str) => {
    return window.location.pathname.startsWith(str)
  }

  const user = auth.user
  return (
    <Navbar expand='md' bg='light' variant='light'>
      <Container>
        <Navbar.Brand as={Link} className='h1 mb-0 me-5' to='/'>
          <em className='text-white'>CV</em>
          <em className='text-custom-green'>Veed</em>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav>
            <Nav.Link as={Link} to='/create' active={isActive('/create')}>Upload CV</Nav.Link>
            <Nav.Link as={Link} to='/list' active={isActive('/list')}>CV List</Nav.Link>
            <Nav.Link as={Link} to='/about' active={isActive('/about')}>About</Nav.Link>
          </Nav>
          {user
            ? (
              <div className='ms-auto'>
                <Navbar.Text className='me-2'>{user.email}</Navbar.Text>
                <button className='btn btn-nav btn-dark' onClick={logOutACB}>Logout</button>
              </div>)
            : (
              <div className='ms-auto'>
                <button className='btn btn-nav btn-dark' onClick={goToLoginACB}>Login</button>
              </div>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
