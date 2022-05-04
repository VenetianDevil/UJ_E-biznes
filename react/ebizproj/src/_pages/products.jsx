import { use } from 'bcrypt/promises';
import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Modal, Form, Table } from 'react-bootstrap';
import { forEach } from 'react-bootstrap/esm/ElementChildren';
import { Link, useParams, setState } from "react-router-dom";
import { LoaderComponent } from '../_components/LoaderComponent';
import { ProductComponent } from '../_components/ProductComponent';
import useServerService from '../_hooks/useServerService';

function Products() {
  const [getProducts] = useServerService();
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([])

  async function getAll() {
    await getProducts()
      .then((data) => {
        setLoading(false);
        setProducts([...products, ...data]);
        console.log(products);
      })
    }
    
    useEffect(() => {
      if(isLoading){
        getAll();
      }
    }, [isLoading])
    
    if (!!isLoading) {
      return (<LoaderComponent></LoaderComponent>)
    }
    
    console.log(products);
  return (
    <section>
      {products.map(product => <ProductComponent product={product}></ProductComponent>)}
    </section>
  )
}

export default Products;
