import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../_styles/loader.css";
import { LoaderComponent } from './LoaderComponent';

export class ProductComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      // isLoading: true,

    };
  }

  render() {
    const { product, isLoading  } = this.state;
    // console.log('admin', admin);
    console.log(product)

    if (isLoading) {
      return (<LoaderComponent></LoaderComponent>)
    }

    return (
      <section>
        <p>{product.Name}</p>
        {/* <CartComponent></CartComponent> */}
      </section>
    );
  }
}
