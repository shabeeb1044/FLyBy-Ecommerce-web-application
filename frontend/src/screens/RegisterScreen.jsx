

import React, { useState,useEffect } from 'react'
 
import { Link,useLocation,useNavigate,useNavigation } from "react-router-dom"
import { Button, Form, Row, Col } from "react-bootstrap"
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Leader from "../components/Leader";
import { useRegisterMutation } from '../slice/usersApiSlice'
import {setCredential} from "../slice/authSlice";
import { toast } from 'react-toastify';


const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [ConformPassword, setConformPassword] = useState("")


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register,{isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state)=> state.auth) 

    const {search} = useLocation;
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || "/"

    useEffect(() => {
      if(userInfo){
        navigate(redirect);
      }
    
    }, [userInfo,redirect,navigate])
    

    const submitHandler = async(e) => {
        e.preventDefault()
      if(password !== ConformPassword){
        toast.error("passwords do not match")
      }else{
        try {

            const res = await register({name,email,password}).unwrap();
            console.log(res);
            dispatch(setCredential({...res,}))
            navigate(redirect)
          } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error)
          }
      }
    
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
                    <Form.Label> Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Enter Your Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='ConformPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={ConformPassword}
                        placeholder="Confirm password"
                        onChange={(e) => setConformPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                   Register
                </Button>
                {isLoading && <Leader/>}
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to={redirect?`/register?redirect=${redirect}` : `/register` }>Login </Link>
                </Col>
            </Row> 
        </FormContainer>
    )
}

export default RegisterScreen
