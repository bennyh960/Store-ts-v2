import { useState } from "react";
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

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(() => {
      return e.target.value;
    });

    setTimeout(() => {
      setData(() => {
        const itemsArr = storeItemsTemp.filter((item) => item.name.includes(e.target.value));
        if (itemsArr.length > 100) return [];
        return itemsArr;
      });
    }, 500);

    // @ts-ignore
    getSearchData(data);
  };

  return (
    <div className="search-item-container">
      <input type="text" value={item} onChange={handleInputSearch} />
    </div>
  );
};
