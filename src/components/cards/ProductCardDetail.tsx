import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  src: string;
  name: string;
  price: number;
  description?: string;
}

export const ProductCardDetail = ({
  src,
  name,
  price,
  description,
}: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-5xl w-full p-3 bg-zinc-700 rounded-md drop-shadow-2xl">
      <Button
        onClick={() => navigate("/")}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{
          color: "#e4e4e7",
          borderColor: "#e4e4e7",
          "&:hover": {
            color: "#f97316",
            borderColor: "#f97316",
          },
        }}
      >
        Voltar
      </Button>
      <h2 className="text-2xl text-zinc-200 text-center font-bold my-5">
        {name}
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <img className="w-5/10 rounded-md" src={src} alt={name} />
        <div>
          <p className="text-zinc-200 text-justify mb-3">{description}</p>
          <span className="text-orange-600 font-semibold mb-5">
            Preço:{" "}
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <div className="flex items-center justify-end mt-5">
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              sx={{
                color: "#e4e4e7",
                borderColor: "#e4e4e7",
                "&:hover": {
                  color: "#f97316",
                  borderColor: "#f97316",
                },
              }}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
