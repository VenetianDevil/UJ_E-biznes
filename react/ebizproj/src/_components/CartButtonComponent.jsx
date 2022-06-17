import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "../_styles/loader.css";
import { LoaderComponent } from './LoaderComponent';
import useAuth from '../_hooks/useAuth';
import useCart from '../_hooks/useCart';
import { Link } from "react-router-dom";
import { NotificationManager } from 'react-notifications';

export default function CartButtonComponent(props) {

  const { isLoggedIn, currentUserValue } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const product = props.product;
  const { addToCart } = useCart(product.ID);

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    await addToCart(currentUserValue().ID)
      .then((data) => {
        NotificationManager.success("Success", 'Product added to cart');
        setLoading(false);
      })
  }

  if (!isLoggedIn) {
    return (
      <Link to="/signin"><Button className='w-100' type='button'>Buy</Button></Link>
    )
  }

  return (
    <Button onClick={handleClick} disabled={isLoading}>{isLoading ? <LoaderComponent></LoaderComponent> : "Buy"}&nbsp;</Button>
  );

}
