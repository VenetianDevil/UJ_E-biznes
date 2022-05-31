import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { LoaderComponent } from '../_components/LoaderComponent';
import { ProductComponent } from '../_components/ProductComponent';
import useCart from '../_hooks/useCart';
import PaymentButtonComponent from '../_components/PaymentButtonComponent';

function Cart() {
  const { getCart } = useCart();
  const [isLoading, setLoading] = useState(true);
  const [items, setProducts] = useState([])

  async function getAll() {
    console.log('get all prod for cart user 1');

    await getCart(1)
      .then((data) => {
        setLoading(false);
        setProducts([...items, ...data]);
        console.log(items);
      })
  }

  useEffect(() => {
    if (isLoading) {
      console.log('getAll cart prods');
      getAll();
    }
  }, [isLoading])

  if (!!isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  }

  return (
    <div>
      <h2>Cart</h2>
      <Row >
        {items.map(item => <ProductComponent key={item.ID} product={item.Product} cannotAddToCart="true"></ProductComponent>)}
      </Row>
      <p>Sum: {items.reduce(function (prev, next) {
        return prev + next.Product.Price;
      }, 0)}</p>
      {items.length > 0 ? <PaymentButtonComponent></PaymentButtonComponent> : null}
    </div>
  )
}

export default Cart;
