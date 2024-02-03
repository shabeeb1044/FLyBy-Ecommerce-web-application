
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Spinner, FormControl, FormGroup, Carousel } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slice/productsApiSlice';
import axios from "axios"
import { useState } from 'react';
import { addToCart } from '../slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from './Loader';
import Meta from '../components/Meta';


const ProductScreen = ({ match }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);


  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  console.log(product);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  console.log(product);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  }


  const submitHandler = async (e) => {

    e.preventDefault();
    console.log(rating, comment);
    try {
      await createReview({
        productId,
        rating,
        comment
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("")

    } catch (err) {

      toast.error(err?.data?.message || err.error)
    }
  }



  return (
    <>

      <Link to="/" className='btn btn-light my-3 '>Go Back</Link>

      {isLoading ? (<div style={{ textAlign: "center", paddingTop: "20px" }}>
        <Loader name="circle" color="black"> </Loader>
      </div>) : error ? (<Message>{error.error}</Message>) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
            

             {product.images.length !== 0 ? (<Carousel variant="dark"  pause="hover"  className="bg-primary mb-4">
                {  product.images .map(item => (
                  <Carousel.Item  key={item._id}>

                    <Link to={`/product/${product._id}`}>
                      <Image className="carousal-img" src={item} alt={product.name} />
                      {/* <Carousel.Caption className='carousel-caption'>
                        <h2>  {product.name} (${product.price})</h2>
                      </Carousel.Caption> */}
                    </Link>
                  </Carousel.Item>

                ))}

              </Carousel>) : (<Image src={product.image} alt={product.name} fluid />) }
              
            </Col>
            <Col md={4} >
              <ListGroup variant='flush'>
                <ListGroup.Item >
                  <h3>{product.name} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Prize: $ {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} variant='flush'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item >
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>$ {product.price} </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </Col>
                    </Row>
                  </ListGroup.Item>

                  {
                    product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col> Qty </Col>
                          <Col>

                            <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x}
                                  </option>
                                ))

                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )
                  }
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={() => addToCartHandler()}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review mt-4"  >
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message> No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name} </strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>

                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write here a Customer Review</h2>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating' className="my-2">
                        <Form.Label> Rating</Form.Label>

                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=""> Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}

                        > </Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'

                      >
                        Submit

                      </Button>

                    </Form>) : (<Message><Link to="/login">Sign in {" "}</Link>to write a review {' '}</Message>)}
                </ListGroup.Item>

              </ListGroup>
            </Col>
          </Row>
        </>
      )}

    </>
  )
}

export default ProductScreen