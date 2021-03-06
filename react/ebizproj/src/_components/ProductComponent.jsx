import React from 'react';
import { Col } from 'react-bootstrap';
import "../_styles/loader.css";
import { LoaderComponent } from './LoaderComponent';
import CartButtonComponent from './CartButtonComponent';

export class ProductComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      cannotAddToCart: !!this.props.cannotAddToCart

    };
  }

  render() {
    const { product, cannotAddToCart, isLoading } = this.state;

    if (isLoading) {
      return (<LoaderComponent></LoaderComponent>)
    }

    return (
      <Col xs sm="3" >
        <div className='product-card'>
          <img src="https://bpgroup.lv/i/product_images/images/Z2000128435.jpg" alt='no product img' />
          <p>{product.Name}</p>
          {cannotAddToCart ? null : <CartButtonComponent product={product}></CartButtonComponent>}
        </div>
      </Col>
    );
  }
}
