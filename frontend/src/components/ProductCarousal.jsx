import React from 'react'
import { Carousel,Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../screens/Loader'
import Message from './Message'
import { useGetTopRatedProductsQuery } from '../slice/productsApiSlice'
import "./Css/ProductCarousal.css"
const ProductCarousal = () => {

    const {data:products,isLoading,error} = useGetTopRatedProductsQuery();

  return isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error}</Message>) : 
  (<Carousel pause="hover" className="bg-primary mb-4">
    {products.map(product => (
       <Carousel.Item key={product._id}>

        <Link to={`/product/${product._id}`}>
            <Image className="carousal-img" src={product.image} alt={product.name}/>
            <Carousel.Caption className='carousel-caption'>
              <h2>  {product.name} (₹{product.price})</h2>
            </Carousel.Caption>
        </Link>
       </Carousel.Item>

    ))}

  </Carousel>)
}

export default ProductCarousal