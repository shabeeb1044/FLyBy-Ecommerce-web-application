import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message'
import Loader from '../Loader'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slice/productsApiSlice'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';



const ProductListScreen = () => {

    const {pageNumber} = useParams();
    const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});
 
   
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct] = useDeleteProductMutation();

    const createProductHandler = async () => {

        if (window.confirm('Are you sure want to create a new product ?')) {

            try {
                await createProduct()
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const deleteHandler = async (id) => {
        if (window.confirm('Are You Sure? ')) {
            try {

                await deleteProduct(id);
                toast.success("Product deleted")
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)

            }
        }
    }
    return <>

        <Row className="align-items-center">

            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className="btn-sm m-3" onClick={createProductHandler}>
                    <FaEdit /> Create Product
                </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <Table striped hover responsive bordered className="table-sm" >
                    <thead>
                        <tr>
                            <td>No</td>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((product, index) => (
                            <tr key={product._id}>

                                <td>{index + 1}</td>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>

                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className="btn-sm">
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{ color: 'white' }} />
                                    </Button>
                                </td>


                            </tr>
                        ))}
                    </tbody>

                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                
            </>
        )

        }
    </>


}

export default ProductListScreen