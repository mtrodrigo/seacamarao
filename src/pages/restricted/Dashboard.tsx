import { useEffect, useState } from "react";
import { HeaderBottom } from "../../components/buttons/HeaderBottom";
import RegisterContainer from "../../components/containers/RegisterContainer";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import api from "../../utils/api";
import AddIcon from "@mui/icons-material/Add";

interface Product {
  _id: string;
  code: string;
  name: string;
  price: number;
  quantity: number;
}

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  cpf_cnpj: string;
}

export interface Sale {
  _id: string;
  user: User;
  products: Product[];
  attended: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState<Sale[]>([]);
  const [token] = useState(localStorage.getItem("seacamarao-token"));
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/sales", {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      })
      .then((response) => {
        setSales(response.data.decryptedData || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <RegisterContainer>
        <div className="flex justify-center items-center h-64">
          <CircularProgress style={{ color: "#e4e4e7" }} size={40} />
        </div>
      </RegisterContainer>
    );
  }

  const pendingSales = sales.filter((sale) => !sale.attended);

  return (
    <RegisterContainer>
      <h1 className="text-2xl text-zinc-200 mb-5">Dashboard</h1>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
        <HeaderBottom to="/" text="Cadastrar produtos" />
        <HeaderBottom to="/" text="Editar produtos" />
        <HeaderBottom to="/" text="Usuários cadastrados" />
        <HeaderBottom to="/restricted/orderhistory" text="Histórico completo" />
      </div>

      <div>
        <h2 className="text-md sm:text-xl text-center text-zinc-200 mb-2">
          Histórico de pedidos não atendidos
        </h2>

        {pendingSales.length === 0 ? (
          <div className="text-center text-zinc-200">
            Nenhum pedido pendente no momento.
          </div>
        ) : (
          <div>
            <table className="w-full text-zinc-200 text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-900">
                  <th className="px-2 py-1 text-center">Data</th>
                  <th className="px-2 py-1 text-center">Cliente</th>
                  <th className="px-2 py-1 text-center">Cidade</th>
                  <th className="px-2 py-1 text-center">Total</th>
                  <th className="px-2 py-1 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {pendingSales.map((sale) => {
                  const total = sale.products.reduce(
                    (sum, product) => sum + product.price * product.quantity,
                    0
                  );
                  const saleDate = new Date(sale.createdAt).toLocaleDateString(
                    "pt-BR"
                  );

                  return (
                    <tr
                      key={sale._id}
                      className="border-b border-zinc-900 hover:bg-zinc-700/50"
                    >
                      <td className="px-2 py-1">{saleDate}</td>
                      <td className="px-2 py-1">{sale.user.name}</td>
                      <td className="px-2 py-1">{sale.user.city}</td>
                      <td className="px-2 py-1">R$ {total.toFixed(2)}</td>
                      <td className="px-2 py-1">
                        <button
                          onClick={() => navigate(`/restricted/orderdetails/${sale._id}`)}
                        >
                          <AddIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </RegisterContainer>
  );
};

export default Dashboard;
