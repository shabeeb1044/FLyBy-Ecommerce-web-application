import { useNavigate } from 'react-router-dom';
import React from 'react'

//css 
import "./Css/Header.css";


import { Nav, Navbar, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import logo from "../assets/flyby.png";
import SearchBox from './SearchBox';

import { useLogoutMutation } from '../slice/usersApiSlice';
import { logout } from "../slice/authSlice"

const Header = () => {


    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
        console.log("logout");
    }

    return (
        <header>
            <Navbar bg='primary' className='header' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href='/' style={{ color: '#fff', fontFamily: 'YourChosenFont', fontSize: '24px' }}>
                            <img src={logo} alt="" className='logo' />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-control='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                           <div className='search-div'>
                           <SearchBox  />
                           </div>
                            <LinkContainer to='/cart'>
                                <Nav.Link to="#"> <FaShoppingCart />
                                    Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg="success" style={{ marginLeft: "2px" }}>
                                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (<NavDropdown title={userInfo.name} id="username" >
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>

                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>

                            </NavDropdown>) : (<LinkContainer to="/login">
                                <Nav.Link href='/login' ><FaUser /> Sign In  </Nav.Link>
                            </LinkContainer>)}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id="adminmenu">
                                    <LinkContainer to="/admin/productslist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown >
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



        </header >
    )
}

export default Header