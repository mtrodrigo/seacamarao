import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sale } from "./Dashboard";
import api from "../../utils/api";
import toast from "react-hot-toast";
import RegisterContainer from "../../components/containers/RegisterContainer";
import { HeaderBottom } from "../../components/buttons/HeaderBottom";
import { CircularProgress } from "@mui/material";

const OrderDetails = () => {
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("seacamarao-token"));
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [attended, setAttended] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await api.get(`sales/getsale/${id}`, {
            headers: {
              Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
            },
          });
          setSale(response.data);
        } catch (error) {
          console.error("Error: ", error);
          toast.error("Erro ao carregar o produto");
          navigate("/restricted/dashboard");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
      toast.error("Erro ao carregar o produto");
      navigate("/restricted/dashboard");
    }
  }, []);

    const handleAttended = async () => {
        try {
            await api.patch(`sales/updateAttended/${id}`, {
                attended: true
            }, {
                headers: {
                    Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
                },
            });
            setAttended(true);
            toast.success("Pedido finalizado com sucesso");
        } catch (error) {
            console.error("Error: ", error);
            toast.error("Erro ao finalizar o pedido");
        }
    }


  const saleDate = sale?.createdAt
    ? new Date(sale.createdAt).toLocaleDateString("pt-BR")
    : "Data não disponível";

  if (loading) {
    return (
      <RegisterContainer>
        <div className="flex justify-center items-center h-64">
          <CircularProgress style={{ color: "#e4e4e7" }} size={40} />
        </div>
      </RegisterContainer>
    );
  }

  return (
    <RegisterContainer>
      <div className="flex w-full items-center justify-start mb-5">
        <HeaderBottom to="/restricted/dashboard" text="Voltar" />
      </div>
      {attended ? (
        <h2 className="text-xl text-green-500 mb-3">Finalizado</h2>
      ) : (
        <div className="flex gap-5 items-center justify-center mb-5">
          <h2 className="text-xl text-red-500">Não finalizado</h2>
          <HeaderBottom to="#" onClick={handleAttended} text="Finalizar pedido" />
        </div>
      )}
      <h1 className="text-zinc-200 text-2xl">Pedido: {sale && sale._id}</h1>
      <h2 className="text-zinc-200 text-xl mb-3">
        Cliente: {sale && sale.user.name}
      </h2>
      <div className="w-full">
        <p className="text-zinc-200">Data do pedido: {saleDate}</p>
        <p className="text-zinc-200">CPF/CNPJ: {sale && sale.user.cpf_cnpj}</p>
        <p className="text-zinc-200">Endereço: {sale && sale.user.address}</p>
        <p className="text-zinc-200">
          Cidade: {sale && sale.user.city}/{sale && sale.user.state}
        </p>
        <p className="text-zinc-200">
          Telefone: {sale && sale.user.phone} Email: {sale && sale.user.email}
        </p>
      </div>
      <h2 className="text-zinc-200 text-xl my-3">Produtos</h2>
      <table className="w-full text-center text-zinc-200">
        <thead>
          <tr className="border-b border-zinc-900 bg-zinc-600">
            <th className="px-2 py-1 text-center">Código</th>
            <th className="px-2 py-1 text-center">Produto</th>
            <th className="px-2 py-1 text-center">Qnt</th>
            <th className="px-2 py-1 text-center">Preço</th>
            <th className="px-2 py-1 text-center">Sub-Total</th>
          </tr>
        </thead>
        <tbody>
          {sale &&
            sale.products.map((product) => {
              const formattedPrice = Number(product.price).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              );

              const total = product.quantity * Number(product.price);

              const formattedTotal = Number(total).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              return (
                <tr className="border-b border-zinc-900" key={product.code}>
                  <td className="px-2 py-1 text-center">{product.code}</td>
                  <td className="px-2 py-1 text-center">{product.name}</td>
                  <td className="px-2 py-1 text-center">{product.quantity}</td>
                  <td className="px-2 py-1 text-center">{formattedPrice}</td>
                  <td className="px-2 py-1 text-center">{formattedTotal}</td>
                </tr>
              );
            })}
          <tr className="border-b border-zinc-900 bg-zinc-600">
            <td className="px-2 py-1 text-center font-bold" colSpan={4}>
              TOTAL
            </td>
            <td className="px-2 py-1 text-center font-bold">
              {sale &&
                sale.products
                  .reduce(
                    (acc, product) =>
                      acc + product.quantity * Number(product.price),
                    0
                  )
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
            </td>
          </tr>
        </tbody>
      </table>
    </RegisterContainer>
  );
};

export default OrderDetails;
