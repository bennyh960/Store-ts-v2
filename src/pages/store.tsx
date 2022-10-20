// import storeItems from "../data/fruits.json";
import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/store/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

// interface Product {
//   name: string;
//   price: number;
//   imgUrl: string;
//   id: string;
// }

type storeProps = {
  section: string;

  // storeItems: Product[];
};

// export function Store({ section, storeItems }: storeProps) {
export function Store({ section }: storeProps) {
  const { departmentData } = useShoppingCart();
  return (
    <>
      <h1>{section}</h1>;
      <Row md={2} xs={1} lg={3} className="g-3">
        {departmentData.map((item) => {
          return <Col key={item.id}>{<StoreItem {...item} />}</Col>;
        })}
      </Row>
    </>
  );
}
