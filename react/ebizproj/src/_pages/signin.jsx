import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { environment } from '../environment.ts';
import useLogin from '../_hooks/useLogin';
import useAuth from '../_hooks/useAuth';

function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signMeIn, logMeIn } = useLogin();
  const { isLoggedIn } = useAuth();
  const [disable, setDisable] = useState(false);
  const [haveAccount, setHaveAccount] = useState(false);
  const navigate = useNavigate();

  function navigateTo(url) {
    window.location.assign(environment.serverUrl + url);
  }

  const signUserIn = async e => {
    e.preventDefault();
    if (username && password) {
      setDisable(true);
      signMeIn({ Username: username, PasswordHash: password })
        .then((user) => {
          if (!!user) {
            navigate('/logged?token=' + user.Jwt, { replace: true });
          } else {
            NotificationManager.error('Registration error', "Try different Username");
          }
          setUsername("");
          setPassword("");
          setDisable(false)
        })
    }
  }

  const logUserIn = async e => {
    e.preventDefault();
    if (username && password) {
      setDisable(true);
      logMeIn({ Username: username, PasswordHash: password })
        .then((user) => {
          if (!!user) {
            navigate('/logged?token=' + user.Jwt, { replace: true });
          } else {
            NotificationManager.error('Login error', "User not found");
          }
          setUsername("");
          setPassword("");
          setDisable(false)
        })
    }
  }

  function switchView() {
    setHaveAccount(!haveAccount);
    setUsername("");
    setPassword("");
  }

  if (!!isLoggedIn) {
    navigate('/', {replace: true});
  }

  return (
    <div>
      <h2>Sign In</h2>
      <Row className='mt-4'>
        <Col xs="12" variant="dark">
          <Button onClick={() => { navigateTo("/auth/login/github") }}>With GitHub</Button>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col xs="12" variant="light">
          <Button onClick={() => { navigateTo("/auth/login/google") }}>With Google</Button>
        </Col>
      </Row>
      <Row className='mt-4 justify-content-md-center'>
        <h2> Traditional account </h2>
        <Col xs="12" md="6">
          {!haveAccount ? (
            <div>
              <Form onSubmit={signUserIn}>
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" name="username" value={username} onChange={e => setUsername(e.target.value.trim())} placeholder="Username" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                </Form.Group>
                <Button type='submit' disabled={disable}>Sign in</Button>
              </Form>
              <Button variant='link' onClick={switchView}>I have an account. Log in!</Button></div>) : (
            <div>
              <Form onSubmit={logUserIn}>
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" name="username" value={username} onChange={e => setUsername(e.target.value.trim())} placeholder="Username" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                </Form.Group>
                <Button type='submit' disabled={disable}>Log in</Button>
              </Form>
              <Button variant='link' onClick={switchView}>I don't have an account. Sign in!</Button></div>)
          }
        </Col>
      </Row>
    </div>
  )
}

export default SignIn;
