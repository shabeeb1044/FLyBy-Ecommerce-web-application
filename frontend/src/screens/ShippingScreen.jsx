import React, { useState } from 'react'

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import {useNavigate} from "react-router-dom"
import { saveShippingAddress } from '../slice/cartSlice';
import ChekoutSteps from '../components/ChekoutSteps';
const ShippingScreen = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storageItem = localStorage.getItem("userInfo");
    //     console.log(storageItem);
    //     if (localStorage.getItem("userInfo") === null || storageItem == null  ) {
    //     navigate("/login")
    //       }
    
    // }, [])
    
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress?.address || "")
    const [city, setCity] = useState(shippingAddress?.city || "")
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "")
    const [country, setCountry] = useState(shippingAddress?.country || "")

    const disPatch = useDispatch();
    
    const sumbitHandler = (e)=>{
            e.preventDefault();
                 disPatch(saveShippingAddress({address,city,postalCode,country}));
                 navigate("/payment")
            
    }
    return (
        <FormContainer>
            <ChekoutSteps step1 step2 />
            
            <h1>
                Shipping
            </h1>

            <Form onSubmit={sumbitHandler}>

            <Form.Group controlId="address" className='my-2'>
                <Form.Label>
                Address
                </Form.Label>
                <Form.Control
                type="text"
                placeholder='enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className='my-2'>
                <Form.Label>
                City
                </Form.Label>
                <Form.Control
                type="text"
                placeholder='enter City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode" className='my-2'>
                <Form.Label>
                Postal code
                </Form.Label>
                <Form.Control
                type="text"
                placeholder='Enter postal code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className='my-2'>
                <Form.Label>
                country
                </Form.Label>
                <Form.Control
                type="text"
                placeholder='enter country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>Continue
            </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
