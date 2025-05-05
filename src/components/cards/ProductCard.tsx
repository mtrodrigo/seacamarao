import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";

interface ProductCardProps {
  src: string;
  name: string;
  price: number;
  to: string;
  onClick: () => void;
}

export const ProductCard = ({
  src,
  name,
  price,
  to,
  onClick,
}: ProductCardProps) => {
  return (
    <section className="w-full p-3 bg-zinc-700 rounded-md drop-shadow-2xl">
      <img className="w-full" src={src} alt={name} />
      <h2 className="text-xl text-zinc-200 text-center font-bold my-3">
        {name}
      </h2>
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-200 font-semibold">
          Preço:{" "}
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="text-zinc-200 flex items-center justify-between">
        <Link className="text-orange-600" to={to}>
          Mais detalhes...
        </Link>
        <Button
          onClick={onClick}
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
          Adicionar
        </Button>
      </div>
    </section>
  );
};
