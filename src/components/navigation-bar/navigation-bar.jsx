import React from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-no-background.png";
import "./navigation-bar.scss";

export const NavigationBar = ({
  user,
  onLoggedOut,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Navbar
      bg="light"
      className="sticky-navbar"
      data-bs-theme="light"
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            style={{ width: "75px", height: "75px", objectFit: "contain" }}
            className="d-inline-block align-top"
            alt="Film Fiesta Logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {user && (
            <>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites">
                Favorites
              </Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
          {!user && (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search movies..."
            className="me-2"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
      </Container>
    </Navbar>
  );
};
