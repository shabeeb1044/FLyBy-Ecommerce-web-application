import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import Rating from './Rating';
import "../components/Css/Home.css"
const Products = ({ Product }) => {
console.log(Product);
    return (
        
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${Product._id}`}>
                <Card.Img className='product-img' src={Product.image} variant='top' />
            </Link>
            <Card.Body>
                <LinkContainer to={`/product/${Product._id}`} style={{cursor:"pointer"}} >
                <Card.Title as="div" className='product-title'>
                        <strong>{Product.name}</strong>
                    </Card.Title>
                </LinkContainer>
                <Card.Text as="div">
                   <Rating value={Product.rating} text={`${Product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="h3" className='pt-1'>
                    ${Product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Products