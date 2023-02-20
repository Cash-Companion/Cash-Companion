import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="images/cash-companion-logo.png" width="250px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome to Cash Companion</h1>
        <p>The easiest way to see where your money is going and plan for future expenses.</p>
        <Col>
          <Button><Link style={{ color: 'white', fontWeight: 'bold' }} to="/signin">Login</Link></Button>{' '}
          <Button><Link style={{ color: 'white', fontWeight: 'bold' }} to="/signup">Register</Link></Button>{' '}
        </Col>
      </Col>

    </Row>
  </Container>
);

export default Landing;
