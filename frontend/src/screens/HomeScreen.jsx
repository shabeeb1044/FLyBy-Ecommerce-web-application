
import "./Loading.css"
import { Row, Col, Spinner } from 'react-bootstrap';
import Products from '../components/Products';
import { useGetProductsQuery } from '../slice/productsApiSlice';
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousal from "../components/ProductCarousal";
import ".././components/Css/Home.css"
const HomeScreen = () => {
  

  const { pageNumber ,keyword} = useParams()
  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber });

  console.log(data);
  return (
    <span className="home">
    {!keyword ?  (<ProductCarousal/>) : <Link to="/" className="btn btn-light mb-4 " >Go Back</Link>}
      {isLoading ? (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <Spinner name="circle" color="red"> </Spinner>
        </div>
      ) : error ? (
        <div>
          {error?.data?.message || error.error}
        </div>
      ) : (
        <>
          <h1>Latest products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products Product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </span>
  );
};

export default HomeScreen;
