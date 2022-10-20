import { useState, useContext, ReactNode, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  //   storeItemsFetch: (department: string) => StoreItemProps[];
  departmentData: StoreItemProps[];
  cartQuantity: number;
  cartItems: CartItem[];
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
  const location = useLocation();
  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      //   console.log(location.pathname);
      await storeItemsFetch(location.pathname.split("/")[1]);
    };
    getData();
  }, [location]);

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

  async function storeItemsFetch(department: string) {
    const response = await (await fetch(`./src/data/${department}.json`)).json();
    console.log(response);
    setDepartmentData(response);
    return departmentData;
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
        // storeItemsFetch,
        departmentData,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      {/* <ShopingCart isOpen={isOpen} storeItemsFetch={storeItemsFetch} /> */}
      <ShopingCart isOpen={isOpen} departmentData={departmentData} />
    </ShoppingCartContext.Provider>
  );
}
