import React from 'react';
import "../_styles/loader.css";

export class LoaderComponent extends React.Component {

  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <div className="lds-facebook"><div></div><div></div><div></div></div>);
  }
}

