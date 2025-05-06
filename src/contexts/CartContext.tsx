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
  const [cart, setCart] = useState<CartProps[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [total, setTotal] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    totalResultCart(cart);
  }, [cart]);

  const addItemCart = (newItem: ProductsProps) => {
    const indexItem = cart.findIndex((item) => item.id === newItem._id);

    if (indexItem !== -1) {
      const cartList = [...cart];
      cartList[indexItem] = {
        ...cartList[indexItem],
        quantity: cartList[indexItem].quantity + 1,
        total: cartList[indexItem].price * (cartList[indexItem].quantity + 1),
      };
      setCart(cartList);
      return;
    }

    const data: CartProps = {
      id: newItem._id,
      name: newItem.name,
      code: newItem.code,
      image: newItem.image,
      price: newItem.price,
      quantity: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
  };

  const removeItemCart = (product: CartProps) => {
    const indexItem = cart.findIndex((item) => item.id === product.id);

    if (cart[indexItem]?.quantity > 1) {
      const cartList = [...cart];
      cartList[indexItem] = {
        ...cartList[indexItem],
        quantity: cartList[indexItem].quantity - 1,
        total: cartList[indexItem].total - cartList[indexItem].price,
      };
      setCart(cartList);
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
  };

  const totalResultCart = (items: CartProps[]) => {
    const result = items.reduce((acc, obj) => acc + obj.total, 0);
    setTotal(
      result.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
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
