
import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slice/usersApiSlice';

import { Button, Form } from 'react-bootstrap'

const UserEditScreen = () => {
  const navigate = useNavigate();

  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser] = useUpdateUserMutation();


  useEffect(() => {
    console.log(user);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }


  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("submitHandler user");
    try {
      console.log(user);
      const data = {
        userId,name,email,isAdmin
      };
      await updateUser(data);
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist")
    } catch (err) {
      toast.error(err?.data?.message || err.message)
      
    }
    // const result = await updateProduct(updatedProduct);
    // if (result.error) {
    //     toast.error("result.error");
    // } else {
    //     toast.success('Product updated');
    //     navigate("/admin/productslist");
    // }

  }



  return (
    <>
      <Link to="/admin/userlist" className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1> Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
          <Form.Check
          type='checkbox'
          label="Is Admin"
          checked={isAdmin} 
          onChange={(e) => setIsAdmin(e.target.checked)}
          >

          </Form.Check>
            </Form.Group>
            <Button
              type="submit"
              variant='primary'
              className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;

