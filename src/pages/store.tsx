import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/store/StoreItem";
import storeItems from "../data/items.json";
import { useLocation } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect } from "react";

type storeProps = {
  section: string;
};

export function Store({ section }: storeProps) {
  const location = useLocation();
  const { dataFromSearch } = useShoppingCart();

  useEffect(() => {
    console.log(dataFromSearch);
  }, []);

  const dataPerCategory = () => {
    return (
      <>
        <h1>{section}</h1>;
        <Row md={2} xs={1} lg={5} className="g-0">
          {storeItems
            .filter((item) => item.category === location.pathname.split("/")[1])
            .map((item) => {
              return <Col key={item.id}>{<StoreItem {...item} />}</Col>;
            })}
        </Row>
      </>
    );
  };
  const dataPerSearch = () => {
    return (
      <>
        <h1>חיפוש...</h1>;
        <Row md={2} xs={1} lg={5} className="g-0">
          {dataFromSearch.map((item) => {
            return <Col key={item.id}>{<StoreItem {...item} />}</Col>;
          })}
        </Row>
      </>
    );
  };

  return <>{dataFromSearch.length > 1 ? dataPerSearch() : dataPerCategory()}</>;
}
