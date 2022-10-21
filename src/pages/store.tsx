import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/store/StoreItem";
import storeItems from "../data/items.json";
import { useLocation } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect, useState } from "react";

type storeProps = {
  section: string;
};

export function Store({ section }: storeProps) {
  const location = useLocation();
  // const [isReset, setIsReset] = useState(false);
  let { dataFromSearch } = useShoppingCart();
  location.state = section;

  useEffect(() => {
    // console.log(dataFromSearch);
    // console.log(location);
    // setIsReset(() => true);

    dataFromSearch = [];
  }, [location.state]);

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

  return <>{dataFromSearch.length > 0 ? dataPerSearch() : dataPerCategory()}</>;
}
