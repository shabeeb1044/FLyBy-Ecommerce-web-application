import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from "react-bootstrap"
import "./Css/Header.css";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || "");


  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("")
      navigate(`/search/${keyword}`)
    } else {

    }

  }
  return (

    <Form onSubmit={onSubmitHandler} className='d-flex className="search"'>
      <Form.Control
        type='text'
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='serach-input'>
      </Form.Control>
      <Button type="submit" variant='outline-light ' className='p-2 mx-2 search-btn'>
        Search
      </Button>






    </Form>
  )
}

export default SearchBox