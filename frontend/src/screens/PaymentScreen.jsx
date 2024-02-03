import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import ChekoutSteps from '../components/ChekoutSteps'; // Typo corrected in component import
import { savePaymentMethod } from "../slice/cartSlice"
const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Corrected the default value
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart;


    useEffect(() => {
        if(!shippingAddress.address) {
            navigate("/shipping")
        }else if(!paymentMethod){
            
        }
    }, [shippingAddress, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder")
    };

    return (
        <FormContainer>
            <ChekoutSteps step1 step2 step3 />

            <h1>Payment Method</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Selected Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label="PayPal or Credit Card"
                            id="payPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>


        </FormContainer>
    );
};

export default PaymentScreen;
