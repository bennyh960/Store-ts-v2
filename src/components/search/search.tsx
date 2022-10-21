import { useState } from "react";
// import { useLocation } from "react-router-dom";
import "./searchbar.css";
import storeItemsTemp from "../../data/items.json";
import { useShoppingCart } from "../../context/ShoppingCartContext";

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
};

export const SearchBar = () => {
  const [item, setItem] = useState("");
  const [data, setData] = useState<StoreItemProps[]>([]);
  const { getSearchData } = useShoppingCart();
  // const location = useLocation();

  // useEffect(() => {
  //   setItem("");
  //   setData([]);
  // }, [location.state]);
  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(location.state);

    setItem(() => {
      console.log(data);
      console.log(e.target.value);

      return e.target.value;
    });

    if (e.target.value.length > 1) {
      setTimeout(() => {
        setData(() => {
          const itemsArr = storeItemsTemp.filter((item) => item.name.includes(e.target.value));
          if (itemsArr.length > 100) return [];
          return itemsArr;
        });
      }, 500);
    } else {
      setData(() => []);
    }

    // @ts-ignore
    getSearchData(data);
  };

  return (
    <div className="search-item-container">
      <input type="text" value={item} onChange={handleInputSearch} placeholder="חפש לפי שם מוצר  " />
    </div>
  );
};
