import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoaderComponent } from '../_components/LoaderComponent';
import Cookies from 'js-cookie';
import useAuth from '../_hooks/useAuth';
import { Link } from "react-router-dom";

function Logged() {

  const { isLoggedIn, login, currentUserValue } = useAuth();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    console.log("-------------------------------------- logger effect ----------------------------------------");
    console.log('logger logged in: ', isLoggedIn)
    console.log('logger is loading: ', isLoading)

    if (!isLoggedIn) {

      if (Cookies.get("user")) {
        let userString = Cookies.get("user")
          .replace(/(['"])?([a-z0-9A-Z_@]+)(['"])?:/g, '"$2": ')
          .replace(/:(['"])?([a-z0-9A-Z_.@\- ]+)(['"])?/g, ': "$2"')
          .replace(/: " /g, ': "');

        let user = JSON.parse(userString);
        if (!!user) {
          login(user);
        }
      }
    } else {
      console.log('logger setting loading on false');
      setLoading(false);
    }

  }, [isLoggedIn])

  if (isLoading && !isLoggedIn && !currentUserValue()) {
    return (
      <LoaderComponent></LoaderComponent>
    )
  }

  return (
    <div>
      <h2>Hello {currentUserValue() ? currentUserValue().Username : "No name"}</h2>
      <Link to="/" ><Button type='button'>Produkty</Button></Link>
    </div>
  )
}

export default Logged;
