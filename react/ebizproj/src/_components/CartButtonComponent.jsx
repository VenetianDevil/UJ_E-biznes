import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "../_styles/loader.css";
import { LoaderComponent } from './LoaderComponent';
import useCart from '../_hooks/useCart';

export default function CartButtonComponent(props) {

  const [isLoading, setLoading] = useState(false);
  const product = props.product;
  const { addToCart } = useCart(product.ID);

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    await addToCart(1)
      .then((data) => {
        setLoading(false);
      })
  }

  return (
    <Button onClick={handleClick} disabled={isLoading}>{isLoading ? <LoaderComponent></LoaderComponent> : "Kup"}&nbsp;</Button>
  );

}
