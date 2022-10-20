import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CartItem } from "../cartItem/cartItem";
// import storeItems from "../../data/fruits.json";

interface Product {
  name: string;
  price: number;
  imgUrl: string;
  id: number;
}
type shoppingCartProps = {
  isOpen: boolean;
  departmentData: Product[];
};

// export const ShopingCart = ({ isOpen, storeItems }: shoppingCartProps) => {
export const ShopingCart = ({ isOpen, departmentData }: shoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} storeItems={departmentData} />;
          })}
          <div className="ms-auto fw-bold fs-5">
            Total
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = departmentData.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
