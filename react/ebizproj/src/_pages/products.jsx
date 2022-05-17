import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { LoaderComponent } from '../_components/LoaderComponent';
import { ProductComponent } from '../_components/ProductComponent';
import useProduct from '../_hooks/useProducts';

function Products() {
  const [getProducts] = useProduct();
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getAll() {
      await getProducts()
        .then((data) => {
          setLoading(false);
          setProducts([...products, ...data]);
          console.log(products);
        })
    }

    if (isLoading) {
      getAll();
    }
  }, [isLoading, getProducts, products])

  if (!!isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  }

  console.log(products);
  return (
    <Row >
      {products.map(product => <ProductComponent product={product}></ProductComponent>)}
    </Row>
  )
}

export default Products;
