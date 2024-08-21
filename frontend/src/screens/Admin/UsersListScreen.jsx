
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../Loader';
import { FaTrash,FaEdit, FaCheck, } from 'react-icons/fa';
import { useDeleteUserMutation, useGetUsersQuery } from '../../slice/usersApiSlice';
import { toast } from 'react-toastify';

const UsersListScreen = () => {
  const { data: users,refetch, isLoading,error } = useGetUsersQuery();
  const [deleteUser,{isLoading:userDeleteLoading}] = useDeleteUserMutation();
  console.log(users);


const deleteHandler = async(id)=>{
    if(window.confirm('Are you  sure?')){
        try {
            await deleteUser(id);
            toast.success("User deleted")
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.error)
            
        }
    }
console.log("delete");

}

  return (
    <>
      <h1>Users</h1>
      {userDeleteLoading && <Loader/>}
      {isLoading ? (<Loader/>) : error ? <Message variant='danger'>{error.message}</Message> :
        (
        <Table className='table-sm' striped   hover responsive >
     <thead>
     <tr>
     <td>ID</td>
     <td>NAME</td>
     <td>EMAIL</td>
     <td>ADMIN</td>
    
     
     <td></td>
     </tr>
     </thead>
     <tbody>
      {users.map((user) => (
         <tr key={user._id} className={user.isAdmin ? "border-2 border-top border-left border-left border-success" : ""}>
          <td>{user._id}</td>
          <td>{user.name }</td>
           <td> <a href={`mailto:${user.email}`}> {user.email}</a></td>
          <td>{user.createdAt.substring(0,10)}</td>
         
        <td>{user.isAdmin ? (
            <FaCheck style={{color:'green'}}/>
        ) : (<FaCheck style={{color:'red'}}/>)}</td>
        <td>
        <LinkContainer to={`/admin/user/${user._id}/edit`}>
          <Button variant='light' className="btn-sm"><FaEdit/></Button>
        </LinkContainer>
        <Button 
        variant='danger'
        className="btn-sm"
        onClick={() => deleteHandler(user._id)}
        >
            <FaTrash style={{color:'white'}}/>
        </Button>
        </td>
         </tr>
      ))}
     
     </tbody>

        </Table>)
      }
    </>

  )}

  export default UsersListScreen