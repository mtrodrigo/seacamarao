import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "./ShowUsers";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import { CircularProgress } from "@mui/material";
import { HeaderBottom } from "../../../components/buttons/HeaderBottom";

const UserDetails = () => {
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("seacamarao-token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState({ initial: true, submit: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Sessão expirada. Faça login novamente.");
      navigate("/login");
      return;
    }
    api
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading((prev) => ({ ...prev, initial: false }));
      })
      .catch((error) => {
        toast.error("Erro ao carregar o usuário");
        console.error("Error: ", error);
        setLoading((prev) => ({ ...prev, initial: false }));
      });
  }, []);

  if (loading.initial) {
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
      <div className="flex w-full items-center justify-start">
        <HeaderBottom to="/restricted/users/showusers" text="Voltar" />
      </div>
      <h1 className="text-2xl text-zinc-200 font-bold mb-5">
        Dados do usuário
      </h1>
      <div className="w-full text-zinc-200">
        <p>
          Nome: {user?.name}{" "}
          {user?.administrator && (
            <span className="text-orange-600"> - Admin</span>
          )}
        </p>
        <p>CPF / CNPJ: {user?.cpf_cnpj}</p>
        <p>Endereço: {user?.address}</p>
        <p>
          Cidade: {user?.city} - {user?.state}
        </p>
        <p>Telefone: {user?.phone}</p>
      </div>
      <div className="flex mt-5">
        <HeaderBottom to={``} text="Editar" />
      </div>
    </RegisterContainer>
  );
};

export default UserDetails;
