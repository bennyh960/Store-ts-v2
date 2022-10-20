import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { useShoppingCart } from "../../context/ShoppingCartContext";
export const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <NavbarBs className="bg-white shadow-sm mb-3" sticky="top">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            חנות
          </Nav.Link>
          <Nav.Link as={NavLink} to="/fruits">
            פירות
          </Nav.Link>
          <Nav.Link as={NavLink} to="/vegtables">
            ירקות
          </Nav.Link>
          <Nav.Link as={NavLink} to="/milk">
            חלב
          </Nav.Link>
          <Nav.Link as={NavLink} to="/cheese">
            גבינות
          </Nav.Link>
          {/* <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link> */}
        </Nav>
        {cartQuantity !== 0 && (
          <Button
            className="rounded-circle"
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            onClick={() => openCart()}
          >
            <BsCart color="blue" />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "50%",
                height: "50%",
                transform: "translate(25%,25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
};
