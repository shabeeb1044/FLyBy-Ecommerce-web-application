import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slice/productsApiSlice';

import { LinkContainer } from 'react-router-bootstrap'
import { Button, Form } from 'react-bootstrap'

const ProductEditScreen = () => {
    const navigate = useNavigate();

    const { id: productId } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState('');

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: updateLoading, error: updateError, }] = useUpdateProductMutation();

    const [uploadProductImage, { isError, isLoading: loadingUpload }] = useUploadProductImageMutation()

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);

        }

        console.log("rend");

    }, [product])

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            brand,
            image,
            description,
            category,
            countInStock,
        }
        console.log(updatedProduct);
        const result = await updateProduct(updatedProduct);
        console.log(result);
        if (result.error) {
            toast.error("result.error");
        } else {
            toast.success('Product updated');
            navigate("/admin/productslist");

        }

    }


    // const uploadFileHandler = (e)=>{
    //      console.log(e.target.files[0]);
    // }
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]; // Use [0] to get the first selected file

        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            console.log(res, "pppppppp");
            toast.success(res.message);
            setImage(res.image)

        } catch (err) {
            toast.error(err?.data?.message || err.error);


        }




        // Update the state with the selected file
        // if (file) {
        //     // Assuming you want to store the file object in the state
        //     setImage(file);
        // }
    };

    return (
        <>
            <Link to="/admin/productslist" className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1> Edit products</h1>
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
                        <Form.Group controlId="price" className="my-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="brand" className="my-2">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="countInStock" className="my-2">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter count in stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Image" className="my-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a image Url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}></Form.Control>
                            {/* <Form.Control
                                type='file'
                                Label='Choose file'
                                onChange={uploadFileHandler}
                            > </Form.Control> */}
                            <Form.Control
                                type='file'
                                label='Choose file'
                                onChange={uploadFileHandler}
                            />

                        </Form.Group>
                        {loadingUpload && <Loader/>}
                    
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
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

export default ProductEditScreen;

