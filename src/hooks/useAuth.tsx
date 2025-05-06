import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface AuthUserProps {
  email: string;
  password: string;
  token?: string;
}

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string>("user");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("seacamarao-token");

    if (token) {
      const parsedToken = JSON.parse(token);
      api.defaults.headers.Authorization = `Bearer ${parsedToken}`;
      setAuthenticated(true);

      try {
        const decoded = jwtDecode<DecodedToken>(parsedToken);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        setUserRole("user");
      }
    } else {
      setAuthenticated(false);
      setUserRole("user");
    }
    setLoading(false);
  }, []);

  const authUser = async (data: AuthUserProps) => {
    if (data.token) {
      localStorage.setItem("seacamarao-token", JSON.stringify(data.token));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setAuthenticated(true);
      
      try {
        const decoded = jwtDecode<DecodedToken>(data.token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        setUserRole("user");
      }
    }
  };

  const login = async (user: AuthUserProps) => {
    let msgText = "Login realizado com sucesso";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
      toast.success(msgText);
      navigate("/");
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
        msgText = "Usuário ou senha incorreto";
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

  return { authenticated, loading, login, logout, userRole, isAdmin: userRole === "admin" };
}
