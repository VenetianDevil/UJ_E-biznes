import { React, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import Products from './_pages/products';

function App() {

  // const [loggedIn, setLoggedIn] = useState(!!auth.currentUserValue());
  // const [isAdmin, setIsAdmin] = useState(!!auth.currentUserValue() && auth.currentUserValue().is_admin);
  // const [currentUrl, setCurrentUrl] = useState(useLocation().pathname);
  // const handleSelect = (href) => { setCurrentUrl(href) };

  // function setAppState() {
  //   console.log('app - update state', !!auth.currentUserValue(), !!auth.currentUserValue() && auth.currentUserValue().is_admin)
  //   setLoggedIn(!!auth.currentUserValue());
  //   setIsAdmin(!!auth.currentUserValue() && auth.currentUserValue().is_admin);
  // }

  return (
    <Router>
      <div className="App">
        <header className="">
        </header>

        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />
              <Route exact path='/products' element={<Products />}> {/* isAdmin={isAdmin} */}
              </Route>
            </Routes>
          </Container>
        </main>

      </div>
    </Router>
  );
}

export default App;
