import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "../_styles/loader.css";
import { LoaderComponent } from './LoaderComponent';
import usePayment from '../_hooks/usePayment';
import { useNavigate } from "react-router-dom";

export default function PaymentButtonComponent(props) {

  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [orderAndPay] = usePayment();

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    await orderAndPay(1)
      .then((data) => {
        setLoading(false);
        navigate("ordered")
      })
  }

  return (
    <Button onClick={handleClick}>{isLoading ? <LoaderComponent></LoaderComponent> : "Pay"}</Button>
  );

}
