import { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { CircularProgress, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
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
  const [filteredProducts, setFilteredProducts] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { addItemCart } = useContext(CartContext);

  useEffect(() => {
    api
      .get("/products/")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleAddItem = (product: ProductsProps) => {
    addItemCart(product);
    toast.success("Produto adicionado com sucesso");
  };

  if (loading) {
    return <CircularProgress style={{ color: "#e4e4e7" }} size={40} />;
  }

  return (
    <Productscontainer>
      <div className="mb-8">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#e4e4e7" }} />
              </InputAdornment>
            ),
            sx: {
              color: "#e4e4e7",
              backgroundColor: "rgba(228, 228, 231, 0.1)",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f97316",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f97316",
                borderWidth: "2px",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f97316",
                borderWidth: "2px",
              },
            },
          }}
        />
      </div>
      <div className="grid gap-10 mx-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
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
