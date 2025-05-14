import { useEffect, useState } from "react";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import { Sale } from "../Dashboard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import { CircularProgress } from "@mui/material";

const MySales = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState<Sale[]>([]);
  const [expandedSale, setExpandedSale] = useState<string | null>(null);
  const [token] = useState(localStorage.getItem("seacamarao-token"));
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    toast.error("Token inválido");
    return;
  }

  useEffect(() => {
    api
      .get("/sales/mysales", {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      })
      .then((response) => {
        setSales(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error: ", error);
        toast.error("Erro ao carregar pedidos");
        setLoading(false);
      });
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateTotal = (products: any[]) => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const toggleSaleDetails = (saleId: string) => {
    setExpandedSale(expandedSale === saleId ? null : saleId);
  };

  if (loading) {
    return (
      <RegisterContainer>
        <div className="flex justify-center items-center h-64">
          <CircularProgress style={{ color: "#71717a" }} size={40} />
        </div>
      </RegisterContainer>
    );
  }

  return (
    <RegisterContainer>
      <h1 className="text-2xl font-bold mb-6 text-zinc-100">Meus pedidos</h1>

      {sales.length === 0 ? (
        <div className="text-center py-8 text-zinc-300">
          <p>Nenhum pedido encontrado</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden border border-zinc-700 text-xs sm:text-base">
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-2 px-1 sm:px-2 text-left text-zinc-300">Data</th>
                <th className="py-2 px-1 sm:px-2 text-left text-zinc-300">Código</th>
                <th className="py-2 px-1 sm:px-2 text-left text-zinc-300">
                  Valor Total
                </th>
                <th className="py-2 px-1 sm:px-2 text-left text-zinc-300">Status</th>
                <th className="py-2 px-1 sm:px-2 text-left text-zinc-300"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {sales.map((sale) => (
                <>
                  <tr
                    key={sale._id}
                    className="hover:bg-zinc-800/50 bg-zinc-900 text-zinc-200 cursor-pointer"
                  >
                    <td className="py-2 px-1 sm:px-2">{formatDate(sale.createdAt)}</td>
                    <td className="py-2 px-1 sm:px-2 font-mono">
                      {sale._id.substring(0, 8).toUpperCase()}
                    </td>
                    <td className="py-2 px-1 sm:px-2">
                      {formatCurrency(calculateTotal(sale.products))}
                    </td>
                    <td className="py-2 px-1 sm:px-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          sale.attended
                            ? "bg-emerald-900 text-emerald-300"
                            : "bg-amber-900 text-amber-300"
                        }`}
                      >
                        {sale.attended ? "Atendido" : "Pendente"}
                      </span>
                    </td>
                    <td className="py-2 px-1 sm:px-2">
                      <button
                        onClick={() => toggleSaleDetails(sale._id)}
                        className="text-zinc-300 hover:text-zinc-100 font-medium flex items-center gap-1"
                      >
                        {expandedSale === sale._id ? (
                          <span>Ocultar</span>
                        ) : (
                          <span>Detalhes</span>
                        )}
                      </button>
                    </td>
                  </tr>

                  {expandedSale === sale._id && (
                    <tr className="bg-zinc-800/30">
                      <td colSpan={5} className="px-4 py-3">
                        <div className="ml-4 pl-4 border-l-2 border-zinc-600">
                          <h3 className="font-medium text-zinc-300 mb-2">
                            Produtos:
                          </h3>
                          <div className="grid gap-2">
                            {sale.products.map((product, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-zinc-700/50"
                              >
                                <div>
                                  <p className="text-zinc-100">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-zinc-400">
                                    Código: {product.code}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-zinc-300">
                                    {formatCurrency(product.price)}
                                  </p>
                                  <p className="text-xs text-zinc-400">
                                    Qtd: {product.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-2 border-t border-zinc-700 flex justify-between items-center">
                            <p className="text-zinc-300">Total do pedido:</p>
                            <p className="font-medium text-zinc-100">
                              {formatCurrency(calculateTotal(sale.products))}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </RegisterContainer>
  );
};

export default MySales;
