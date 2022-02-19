import React from "react"
import {Navbar,Container,Nav,NavDropdown, Image} from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout} from '../actions/userActions'
import { Link } from 'react-router-dom';
import Aux from "../hoc/_Aux/index"
function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const logoutHandler = (e)=>{
    e.preventDefault()
    dispatch(logout())
    navigate('/')
  }
  // #9A8C6B
//  #5F452A
  return (
    <Aux>
      <Navbar className='nav-bar-color'  variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'><Image src='/images/LIB.png' roundedCircle style={{width:'60px', height:'60px'}} fluid ></Image> Lib-Contracts</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>

              {userInfo ? <Aux>
                <Nav.Link as={Link} to='/home'><i className="fas fa-home"></i> Home</Nav.Link>
                <Nav.Link as={Link} to='/contracts'><i className="fa-solid fa-file-contract"></i> Contracts</Nav.Link>
                <Nav.Link as={Link} to='/reports'><i className="fas fa-file-word"></i> Reports</Nav.Link>
                <NavDropdown title={userInfo.username} id='username'>

                  {/* <NavDropdown.Item as={Link} to='/home'> Home</NavDropdown.Item> */}
                  {/* <NavDropdown.Item as={Link} to='/addotp'><i className="fas fa-key"></i> OTP Registeration</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/branches'><i className="fas fa-university"></i> Branches</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/search'><i className="fas fa-search"></i> Search</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/report'><i className="fas fa-file-word"></i> Reposts</NavDropdown.Item> */}
                  <NavDropdown.Item onClick={logoutHandler}><i className="fas fa-sign-out-alt"></i> Logout</NavDropdown.Item>
                </NavDropdown></Aux> :
                <Nav.Link as={Link} to='/'><i class="fas fa-user"></i> Login</Nav.Link>
              }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Aux>
  )
}

export default Header
