import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import storeItems from "../../data/items.json";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Product {
  name: string;
  price: number;
  imgUrl: string;
  id: string;
  category?: string;
}

type cartItemProps = {
  id: string;
  quantity: number;
  storeItems: Product[];
  key?: string;
};

// export const CartItem = ({ id, quantity, storeItems }: cartItemProps) => {
export const CartItem = ({ id, quantity }: cartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center ">
      <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "contain" }} />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.75rem" }}>
              x {quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.85rem" }}>
          {formatCurrency(item.price)}
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
      </div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
        &times;
      </Button>
    </Stack>
  );
};
