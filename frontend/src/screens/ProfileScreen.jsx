import React, { useEffect, useState } from 'react'
import { Table, Form, Button, Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from "react-toastify";
import {FaTimes} from "react-icons/fa"
import Message from "../components/Message";
import Leader from '../components/Leader';
import { useProfileMutation } from "../slice/usersApiSlice";
import { setCredential } from "../slice/authSlice";
import {useGetMyOrderQuery} from "../slice/orderApiSlice";
import Loader from './Loader';


const ProfileScreen = () => {



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");


    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile,{isLoading:loadingUpdateProfile,}]= useProfileMutation()
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }


    }, [userInfo,userInfo.name, userInfo.email])


    const {data:orders,isLoading,error} = useGetMyOrderQuery();
// console.log(userInfo);
    const submitHandler = async(e)   => {
        e.preventDefault();
        console.log("submitHandler");
        if(password != confirmPassword){
            toast("Password do not match")
        }else{
           
            try {
                console.log("22222");
                const res = await updateProfile({_id:userInfo._id,name,email,password,}).unwrap();
                console.log(res);
                dispatch(setCredential(res))
                toast.success("Profile updated successfully")
            console.log(res,"1111111");
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User profile </h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className="my-2">
                    <Form.Label>Name</Form.Label>
                       <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name} 
                        onChange={(e) =>setName(e.target.value)}
                        ></Form.Control> 
                    </Form.Group>
                    <Form.Group controlId='email' className="my-2">
                    <Form.Label>Email</Form.Label>
                       <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email} 
                        onChange={(e) =>setEmail(e.target.value)}
                        ></Form.Control> 
                    </Form.Group>
                    <Form.Group controlId='password' className="my-2">
                    <Form.Label>Password</Form.Label>
                       <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password} 
                        onChange={(e) =>setPassword(e.target.value)}
                        ></Form.Control> 
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className="my-2">
                    <Form.Label>confirmPassword</Form.Label>
                       <Form.Control
                        type="password"
                        placeholder="confirm Password"
                        value={confirmPassword} 
                        onChange={(e) =>setConfirmPassword(e.target.value)}
                        ></Form.Control> 
                    </Form.Group>
                    <Button type="submit" variant='primary' className="my-2">
                        Update
                    </Button>

                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {  isLoading ? <Loader/> : error ? (<Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>) : orders !== null ? (<Message variant="danger">You order Item empty</Message>) : (
                    <Table striped  hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Deliverd</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) =>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0,10)
                                    ) : (
                                        <FaTimes style={{color:"red"}}/>
                                    )}
                                </td>
                                <td>
                                    {order.isDeliverd ? (
                                        order.deliveredAt.substring(0,10)
                                    ): <FaTimes  style={{color:"red"}}/>}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`} >
                                        <Button className="btn-sm" variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>


                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    )}
            </Col>

        </Row>
    )
}

export default ProfileScreen