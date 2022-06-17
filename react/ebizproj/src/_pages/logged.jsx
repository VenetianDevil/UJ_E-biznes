import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoaderComponent } from '../_components/LoaderComponent';
// import Cookies from 'js-cookie';
import useAuth from '../_hooks/useAuth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'

function Logged() {

  const { isLoggedIn, login, currentUserValue } = useAuth();
  const [isLoading, setLoading] = useState(true);
  // let [searchParams, setSearchParams] = useSearchParams();
  const search = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("-------------------------------------- logger effect ----------------------------------------");
    console.log('logger logged in: ', isLoggedIn)
    console.log('logger is loading: ', isLoading)

    if (!isLoggedIn) {

      const query = new URLSearchParams(search);
      const token = query.get('token')
      if(token){
        let user = jwt(token);
        user.token = token;
        console.log(user);
  
        if (!!user) {
          login(user);
          navigate('/logged', {replace: false});
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
