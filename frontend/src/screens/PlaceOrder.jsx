import React, { useEffect } from 'react'
import { Button, Col, Row, ListGroup, Image, Card, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import ChekoutSteps from '../components/ChekoutSteps'
import Message from '../components/Message'
import { useCreateOrderMutation } from "../slice/orderApiSlice"
import { clearCartItems } from "../slice/cartSlice"
{/* <Spinner name="circle"  color="red"> </Spinner>  */ }


const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const [createOrder, {isLoading,error}] = useCreateOrderMutation()
    const { shippingAddress } = cart
    useEffect(() => {
        console.log(shippingAddress.address);
        if (!shippingAddress.address) {
            navigate("/shipping")
        } else if (!cart.paymentMethod) {
            navigate("/placeorder")
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

    console.log(cart);

    const placeOrderHandler = async ()=>{
        try {
            console.log(cart.cartItems);

            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress,
                paymentMethod:cart.PaymentMethod,
                itemPrice:cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems())

            navigate(`/order/${res._id}`);

        } catch (error) {
            toast.error(error);
            
        }
    }

    return (
        <>
            <ChekoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {shippingAddress.address},{shippingAddress.city}{shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.PaymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order items </h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>You Cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col >
                                                    <Link to={`/products/${item.product}`} >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row> 

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total price : </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row> 
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Button
                               type="button"
                               className='btn-block'
                               disabled={cart.cartItems.length == 0 }
                               onClick= {placeOrderHandler}
                               >
                               Place Order
                               </Button>
                              
                         {isLoading && (<Spinner name="circle"  color="red"> </Spinner>)}
                            </ListGroup.Item>  
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </>
    )
}

export default PlaceOrder