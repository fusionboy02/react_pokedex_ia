import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/home";
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import { Navbar, Container, Nav, Form, Button, Row, Col } from 'react-bootstrap';
 
import './App.css'

function App() {

  return (
    <>
      <Navbar expand="lg" className="bg-navbar-orange">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src="/img/logo.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto full-width pr-15">

              <Form inline>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Buscar por nombre, tipo, etc"
                    />
                  </Col>
                </Row>
              </Form>

              <Nav.Link className='ml-auto' as={Link} to="/">Inicio</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className='body-content'>
        <Row>
          <Col lg={2} md={12} className='filter-bar'>
            <Row>
              <Col >
                  <div className='left-input-container'>
                    <h3 className='input-title'>Generación</h3>
                    <Form.Select size="lg">
                      <option defaultChecked value={""} disabled>Generación</option>
                      <option value={1}>Generación 1</option>
                      <option value={1}>Generación 2</option>
                      <option value={1}>Generación 3</option>
                    </Form.Select>
                  </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='left-input-container'>
                  <h3 className='input-title'>Tipo principal</h3>
                  <Button className='input-type input-fuego'>Fuego</Button>
                  <Button className='input-type input-psiquico'>Psiquico</Button>
                  <Button className='input-type input-agua'>Agua</Button>
                  <Button className='input-type input-planta'>Planta</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className='main-content' lg={10} md={12}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Col>
        </Row>
      </Container>



    </>
  )
}

export default App
