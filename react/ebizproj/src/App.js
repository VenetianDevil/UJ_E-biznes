import { React, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import Products from './_pages/products';
import Cart from './_pages/cart';
import OrderSummary from './_pages/orderSummary';
import SignIn from './_pages/signin';

function App() {

  // const [loggedIn, setLoggedIn] = useState(!!auth.currentUserValue());
  // const [isAdmin, setIsAdmin] = useState(!!auth.currentUserValue() && auth.currentUserValue().is_admin);
  const [currentUrl, setCurrentUrl] = useState(useLocation().pathname);
  const handleSelect = (href) => { setCurrentUrl(href) };

  // function setAppState() {
  //   console.log('app - update state', !!auth.currentUserValue(), !!auth.currentUserValue() && auth.currentUserValue().is_admin)
  //   setLoggedIn(!!auth.currentUserValue());
  //   setIsAdmin(!!auth.currentUserValue() && auth.currentUserValue().is_admin);
  // }

  return (
    <div className="App">
      <header className="">
        <Navbar bg="light" className="py-3 mb-5" >
          <Container>
            <Nav className='w-100' activeKey={currentUrl} onSelect={handleSelect}> {/*  */}
              <Navbar.Brand>
                <Nav.Link to="/" href="/products">
                  <img src="/images/logo.png" height="60" className="d-inline-block align-top" alt="Logo" />
                </Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className='ms-auto' activeKey={currentUrl} onSelect={handleSelect}>
                <Navbar.Collapse id="basic-navbar-nav" >
                  {/* {!!loggedIn ? <Navbar.Text>{auth.currentUserValue().username} </Navbar.Text> : null} */}
                  <Nav.Link href="/products">Products</Nav.Link>
                  <Nav.Link href="/cart">Cart</Nav.Link>
                  <Nav.Link href="/signin">Sign in</Nav.Link>
                  {/* {!!loggedIn && !auth.currentUserValue().is_admin ? <Nav.Link href="/account">Account</Nav.Link> : ''}
                    {!loggedIn ? <Nav.Link href="/login">Login</Nav.Link> : <Logout setAppState={setAppState}></Logout>} */}
                </Navbar.Collapse>
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="products" />} />
            <Route exact path='products' element={<Products />}> {/* isAdmin={isAdmin} */}</Route>
            <Route path="cart" element={<Cart />} />
            <Route path="cart/ordered" element={<OrderSummary></OrderSummary>} />
            <Route path="signin" element={<SignIn />} />
          </Routes>
        </Container>
      </main>

      <footer className="mt-5">

      </footer>

    </div>
  );
}

export default App;
