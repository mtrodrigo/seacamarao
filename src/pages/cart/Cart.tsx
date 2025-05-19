import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { HeaderBottom } from "../../components/buttons/HeaderBottom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/api";
import prepareWhatsAppMessage from "../../utils/prepareWhatsappMessage";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem("seacamarao-token"));
  const { addItemCart, cart, cartAmount, removeItemCart, clearCart, total } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    toast.error("Token inválido");
    return;
  }

  const createSale = async () => {
    try {
      setLoading(true);

      if (!cart || cart.length === 0) {
        throw new Error("Carrinho vazio");
      }

      const saleData = {
        products: cart.map((product) => ({
          name: product.name,
          code: product.code,
          price: product.price,
          quantity: product.quantity,
        })),
      };

      const response = await api.post(`/sales/createsale`, saleData, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
          "Content-Type": "application/json",
        },
      });

      const { salvedSale } = response.data;
      const { user } = salvedSale;

      const whatsappMessage = prepareWhatsAppMessage(cart, total, {
        name: user.name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
      });

      window.open(
        `https://wa.me/5535984061841?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      );

      clearCart();
      navigate("/restricted/sales/mysales");
      toast.success(`Pedido #${salvedSale._id} criado com sucesso!`);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      toast.error("Erro ao processar pedido");
    } finally {
      setLoading(false);
    }
  };

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
            <caption className="text-2xl font-bold mb-5">
              Carrinho de compras
            </caption>
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
                <tr
                  key={product.id}
                  className="text-center border-b border-zinc-700"
                >
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
                    {(product.price * product.quantity).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
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
            <button
              onClick={createSale}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Processando..." : "Finalizar compra"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
