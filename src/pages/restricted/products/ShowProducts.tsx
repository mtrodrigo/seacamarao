import { useEffect, useState } from "react";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import { ProductsProps } from "../../home/Home";
import api from "../../../utils/api";
import { HeaderBottom } from "../../../components/buttons/HeaderBottom";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress style={{ color: "#e4e4e7" }} size={40} />;
  }

  return (
    <RegisterContainer>
      <div className="flex w-full items-center justify-start">
        <HeaderBottom to="/restricted/dashboard" text="Voltar" />
      </div>
      <h1 className="text-2xl text-zinc-200 font-bold">Produtos Cadastrados</h1>
      <small className="text-zinc-200 mt-5">
        Cliqle na imagem para editar o produto
      </small>
      <table className="w-full text-zinc-200 mx-auto text-center text-xs sm:text-sm">
        <thead>
          <tr className="bg-zinc-600 border-b border-zinc-800">
            <th className="py-1 px-2"></th>
            <th className="py-1 px-2">Código</th>
            <th className="py-1 px-2">Produto</th>
            <th className="py-1 px-2">Preço</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const formattedPrice = Number(product.price).toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            );
            return (
              <tr key={product._id} className="border-b border-zinc-800">
                <td className="py-1 px-2">
                  <Link to={`/restricted/products/editproduct/${product._id}`}>
                    <img
                      className="w-12"
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>
                </td>
                <td className="py-1 px-2">{product.code}</td>
                <td className="py-1 px-2">{product.name}</td>
                <td className="py-1 px-2">{formattedPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </RegisterContainer>
  );
};

export default ShowProducts;
