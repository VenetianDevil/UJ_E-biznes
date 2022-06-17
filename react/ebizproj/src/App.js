import { React, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
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
import Logged from './_pages/logged';
import { NotificationContainer } from 'react-notifications';
import useAuth from './_hooks/useAuth';
import Logout from './_pages/logout';
import Payment from './_pages/payment';

function App() {

  const [currentUrl, setCurrentUrl] = useState(useLocation().pathname);
  const handleSelect = (href) => { setCurrentUrl(href) };

  const {currentUserValue} = useAuth();
  const [_refresh, forceRefresh] = useState();

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
                  {currentUserValue() ? <Navbar.Text>{currentUserValue().Username} </Navbar.Text> : null}
                  <Nav.Link href="/products">Products</Nav.Link>
                  {currentUserValue() ? <Nav.Link href="/cart">Cart</Nav.Link> : null}
                  {!currentUserValue() ? <Nav.Link href="/signin">Sign in</Nav.Link> : null}
                  {currentUserValue() ? <Nav.Link href="logout">Logout</Nav.Link> : null}
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
            <Route path="cart/payment/:amount" element={<Payment></Payment>} />
            <Route path="signin" element={<SignIn />} />
            <Route path='logged' element={<Logged />} />
            <Route path='logout' element={<Logout callback={forceRefresh} />} />
          </Routes>
        </Container>
      </main>

      <footer className="mt-5">

      </footer>
      <NotificationContainer />

    </div>
  );
}

export default App;
