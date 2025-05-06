import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductsProps } from "../pages/home/Home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductsProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
}

interface CartProps {
  id: string;
  name: string;
  code: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
  description?: string;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    totalResultCart(cart);
  }, [cart]);

  const addItemCart = (newItem: ProductsProps) => {
    const indexItem = cart.findIndex((item) => item.id === newItem._id);

    if (indexItem !== -1) {
      let cartList = [...cart];
      cartList[indexItem].quantity = cartList[indexItem].quantity + 1;
      cartList[indexItem].total =
        cartList[indexItem].price * cartList[indexItem].quantity;
      setCart(cartList);
      totalResultCart(cartList);
      return;
    }
    let data = {
      id: newItem._id,
      name: newItem.name,
      code: newItem.code,
      image: newItem.image,
      price: newItem.price,
      quantity: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);
  };

  const removeItemCart = (product: CartProps) => {
    const indexItem = cart.findIndex((item) => item.id === product.id);

    if (cart[indexItem]?.quantity > 1) {
      let cartList = [...cart];
      cartList[indexItem].quantity = cartList[indexItem].quantity - 1;
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      return;
    }
    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
  };

  const totalResultCart = (items: CartProps[]) => {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const resultFormated = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(resultFormated);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
