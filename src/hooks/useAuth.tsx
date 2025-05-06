import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface AuthUserProps {
  email: string;
  password: string;
  token?: string;
}

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("seacamarao-token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const authUser = async (data: AuthUserProps) => {
    setAuthenticated(true);
    localStorage.setItem(
      "seacamarao-token",
      JSON.stringify(data.token)
    );
  };

  const login = async (user: AuthUserProps) => {
    let msgText = "Login realizado com sucesso";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
      toast.success(msgText);
      navigate("/home");
    } catch (error) {
      if (
        error instanceof Error &&
        "response" in error &&
        (error as any).response.data &&
        (error as any).response.data.message
      ) {
        msgText = (error as any).response.data.message;
        toast.error(msgText);
      } else {
        msgText = "Erro ao realizar login";
        toast.error(msgText);
        console.error("Error:", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("seacamarao-token");
    delete api.defaults.headers.Authorization;

    setAuthenticated(false);
    navigate("/", { replace: true });
  };

  return { authenticated, loading, login, logout };
}
