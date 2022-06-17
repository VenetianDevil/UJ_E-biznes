import React, { useEffect, useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import { LoaderComponent } from '../_components/LoaderComponent';
import { ProductComponent } from '../_components/ProductComponent';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../_hooks/useAuth';
import useCart from '../_hooks/useCart';
import usePayment from '../_hooks/usePayment';

function Cart() {
  const { isLoggedIn, currentUserValue } = useAuth();
  const { getCart } = useCart();
  const { placeOrder } = usePayment();

  const [isLoading, setLoading] = useState(true);
  const [items, setProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  let navigate = useNavigate();

  async function getAll() {
    console.log('get all prod for cart user 1');

    await getCart(currentUserValue().ID)
      .then((data) => {
        setLoading(false);
        setProducts([...items, ...data]);
        console.log(data);
        setTotalCart(data.reduce(function (prev, next) {
          return prev + next.Product.Price;
        }, 0));
      })
  }

  useEffect(() => {
    if (isLoading) {
      console.log('getAll cart prods');
      getAll();
    }
  }, [isLoading])

  async function orderAndPay() {
    if(totalCart > 0){
      await placeOrder(currentUserValue().ID).then((data) => {
        navigate(`payment/${totalCart}`)
      })
    } else {
      console.error('nothing to pay');
    }
  }

  if (!!isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  } else if (!isLoggedIn) {
    return (
      <div>
        <h2>Access denied</h2>
        <p>Please log in to get access to cart.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Cart</h2>
      <Row >
        {items.map(item => <ProductComponent key={item.ID} product={item.Product} cannotAddToCart="true"></ProductComponent>)}
      </Row>
      <p>Sum: {totalCart}</p>
      {items.length > 0 ? <Link to={`payment/${totalCart}`}><Button type='button' style={{ "minWidth": "100px" }} onClick={orderAndPay}>Order and Pay</Button></Link>
        : null}
    </div>
  )
}

export default Cart;
