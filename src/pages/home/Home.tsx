import { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { CircularProgress } from "@mui/material";
import Productscontainer from "../../components/containers/Productscontainer";
import { ProductCard } from "../../components/cards/ProductCard";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export interface ProductsProps {
  _id: string;
  name: string;
  code: string;
  description: string;
  price: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addItemCart } = useContext(CartContext);

  useEffect(() => {
    api
      .get("/products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  const handleAddItem = (product: ProductsProps) => {
    addItemCart(product)
    toast.success("Produto adicionado com sucesso")
  };

  if (loading) {
    return <CircularProgress style={{ color: "#e4e4e7" }} size={40} />;
  }

  return (
    <Productscontainer>
      <div className="grid gap-10 mx-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            src={product.image}
            name={product.name}
            price={product.price}
            onClick={() => handleAddItem(product)}
            to={`/details/${product._id}`}
          />
        ))}
      </div>
    </Productscontainer>
  );
};

export default Home;
