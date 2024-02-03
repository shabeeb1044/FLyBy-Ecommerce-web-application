
import React, { useEffect } from 'react'
import { Col, Row, ListGroup, Form, Image, Button, Card, Spinner, ListGroupItem } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery, usePayOrderMutation
} from '../slice/orderApiSlice';
import Message from '../components/Message';
import Leader from '../components/Leader';
import { PayPalButtons, usePayPalScriptReducer, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';
const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error,refetch } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay, }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPaypal, error: errorPaypal, } = useGetPaypalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);
console.log("useInfo",userInfo,"useInfo");

  useEffect(() => {
    console.log(order);
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            'clientId': paypal.clientId,
            currency: "USD",
          }
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" })

      }
      if (order && !order.isPaid) {

        if (!window.paypal) {
          loadPayPalScript();
        }
      }

    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  const [deliverOrder,{data:deliver,isLoading:loadingDeliver}] = useDeliverOrderMutation()

  async function onApprove(data,actions) {
    return actions.order.capture().then(async function(details){
      try {
        await payOrder({orderId,details});
        refetch()
          toast.success("Payment successfully")
      } catch (err) {
        toast.error(err?.data?.Message || err.message);
      }
    })
  }
  async function onApproveTest() {
    alert(orderId)
    await payOrder({orderId,details:{payer:{name:"shabeeb"}}});
    refetch();
    toast.success("Payment test successfully ");
    console.log(order.isPaid);
  }
  function onError(err) {
    toast.error(err.message)
  }

  const deliverOrderHandler = async()=>{
console.log("deliverOrderHandler");
    try {
      await deliverOrder(orderId);
      refetch()
console.log(order,"[[][][][][");
      console.log();    
    } catch (err) {
      toast.error(err.message)
    }
  }
  function createOrder(data,actions) {
    return actions.order.create({
      purchase_units:[
        {
          amount:
          { value: order.totalPrice,
         
        }}
      ]
    }).then((orderId)=> {
      return orderId;
    })
  }


  return isLoading ? <Loader /> : error ? <Message variant="danger" /> : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email: {order.user.email}</strong></p>
              <p>
                <strong>
                  Address:
                </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{" "},
                {order.shippingAddress.postalCode},{order.shippingAddress.country}
              </p>
              {order.isDeliverd ? (
                <Message>
                  Deliver on {order.deliveredAt}
                </Message>) : (
                <Message variant="danger">
                  Not Delivered
                </Message>)}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p><b>method:</b>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message>
                  paid on:  {order.paidAt}
                </Message>) : (
                <Message variant="danger">
                  Not Paid
                </Message>)}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} X ${item.price} = {item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>

          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col >
                    Items </Col>
                  <Col> {order.itemPrice}</Col>
                </Row>
                <Row>
                  <Col >
                    Shipping: </Col>
                  <Col> {order.shippingPrize}</Col>
                </Row>
                <Row>
                  <Col >
                    Tax: </Col>
                  <Col> {order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col >
                    Total: </Col>
                  <Col> {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? <Loader /> : (
                    <div>
                    <div>
                      <Button onClick={onApproveTest} variant='success'> Test btn</Button>
                    </div>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>

                  )}
                </ListGroup.Item>
              )}
             
              {/* Mark as Deliver place holder */}
              {loadingDeliver && <Loader/>}
                   { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <ListGroup.Item>
                        <Button type="button" className='btn btn-block'
                        onClick={deliverOrderHandler}>
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )


}

export default OrderScreen