import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { HeaderBottom } from "../../components/buttons/HeaderBottom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const { addItemCart, cart, cartAmount, removeItemCart, total } =
    useContext(CartContext);
  return (
    <div className="max-w-2xl w-full my-5 mx-2">
      {cartAmount === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-zinc-200 font-bold">Carrinho vazio</p>
          <HeaderBottom to="/" text="Continuar comprando" />
        </div>
      ) : (
        <>
          <table className="w-full my-5 text-zinc-200">
            <caption className="text-2xl font-bold mb-5">Carrinho de compras</caption>
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Quant.</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr className="text-center border-b border-zinc-700">
                  <td className="flex items-center justify-center py-4">
                    <img
                      className="w-12"
                      src={product.image}
                      alt={product.name}
                    />
                  </td>
                  <td className="py-4">{product.name}</td>
                  <td className="flex items-center justify-center gap-3 py-4">
                    <button onClick={() => removeItemCart(product)}>
                      <RemoveIcon />
                    </button>
                    {product.quantity}
                    <button
                      onClick={() =>
                        addItemCart({
                          _id: product.id,
                          name: product.name,
                          code: product.code,
                          image: product.image,
                          price: product.price,
                          description: product.description || "",
                        })
                      }
                    >
                      <AddIcon />
                    </button>
                  </td>
                  <td className="py-4">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         {cartAmount > 0 && (
           <div className="flex items-center gap-10 justify-end text-zinc-200 font-bold mx-5">
            <span>TOTAL</span>
            <span>{total}</span>
           </div>
         )}
          <div className="flex items-center justify-center gap-16 my-10">
            <HeaderBottom to="/" text="Continuar comprando" />
            <HeaderBottom to="/" text="Finalizar compra" />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
