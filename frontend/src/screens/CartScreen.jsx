import React from 'react'
import { Link, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slice/cartSlice';
const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {

        dispatch(addToCart({ ...product, qty }))
    }
    const removeFromCartHandler = async (id) => {

        dispatch(removeFromCart(id))
    }
    const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');

    // To navigate to the "/login" page with a "redirect" parameter set to "/shipping"
// window.location.href = '/login?/shipping';

    }
    return (
        <Row>

            <Col md={8}>
                <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    // <Message> 
                    //     Your cart is empty  <Link to="/" >Go Back </Link>

                    //  </Message>
                    <div className="empty-cart">
                        <div className="cart-icon">🛒</div>
                        <p>Your cart is empty.</p>
                        <button className="go-back-button"><Link to="/">Go Back</Link></button>
                    </div>

                ) : (
                    <ListGroup variant='flush'>
                        {
                            cartItems.map((item) => (
                                <ListGroup.Item>

                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>

                                        </Col>
                                        <Col md={2}><h3>${item.price}</h3>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as="select" value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))

                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="button" variant='light' onClick={() => removeFromCartHandler(item._id)}>
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>

                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>
                                {cartItems.qty}
                                subTotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            </h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={()=> checkOutHandler()}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

            </Col>


        </Row>



    )
}

export default CartScreen