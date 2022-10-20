import { useState, useContext, ReactNode, createContext } from "react";

import { ShopingCart } from "../components/shopingcart/ShopingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  getSearchData: (dataSearch: StoreItemProps[]) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  dataFromSearch: StoreItemProps[];
};

type CartItem = {
  id: string;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  //   const [cartItems, setCartItems] = useState<CartItem[]>([]); //* before adding hook of local storage
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);
  const [dataFromSearch, setDataFromSearch] = useState([]);
  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function getSearchData(dataSearch: []) {
    setDataFromSearch(dataSearch);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        getSearchData,
        // storeItemsFetch,
        // departmentData,
        dataFromSearch,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShopingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
