import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { environment } from '../environment.ts';
import useServerServie from '../_hooks/useServerService'

function SignIn() {

  const [request] = useServerServie();

  function navigateTo(url) {
    window.location.assign(environment.serverUrl + url);
  }

  return (
    <div>
      <h2>Sign In</h2>
      <Row>
        <Col xs="12" sm="6" variant="dark">
          <Button onClick={() => { navigateTo("/auth/login/github") }}>With GitHub</Button>
        </Col>
        <Col xs="12" sm="6" variant="light">
          <Button onClick={() => { navigateTo("/auth/login/google") }}>With Google</Button>
        </Col>
      </Row>

    </div>
  )
}

export default SignIn;
