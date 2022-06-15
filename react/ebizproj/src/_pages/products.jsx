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
        })
    }

    if (isLoading) {
      getAll();
    }
  }, [isLoading, getProducts, products])

  if (!!isLoading) {
    return (
    <div>
      <h2>Products</h2>
      <LoaderComponent></LoaderComponent>
    </div>
    )
  }

  return (
    <div>
      <h2>Products</h2>
      <Row >
        {products.map(product => <ProductComponent key={product.ID} product={product}></ProductComponent>)}
      </Row>
    </div>
  )
}

export default Products;
