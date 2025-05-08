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
  administrator: boolean;
  exp: number;
  iat: number;
}

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const getAdminStatusFromToken = (token: string | null): boolean => {
    if (!token) return false;
    try {
      const parsedToken = JSON.parse(token);
      const decoded = jwtDecode<DecodedToken>(parsedToken);
      return decoded.administrator || false;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("seacamarao-token");
    const adminStatus = getAdminStatusFromToken(token);
    
    if (token) {
      const parsedToken = JSON.parse(token);
      api.defaults.headers.Authorization = `Bearer ${parsedToken}`;
      setAuthenticated(true);
      setIsAdmin(adminStatus);
    } else {
      setAuthenticated(false);
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  const login = async (user: AuthUserProps) => {
    let msgText = "Login realizado com sucesso";

    try {
      const response = await api.post("/users/login", user);
      const data = response.data;
      
      localStorage.setItem("seacamarao-token", JSON.stringify(data.token));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      
      const decoded = jwtDecode<DecodedToken>(data.token);
      
      setAuthenticated(true);
      setIsAdmin(decoded.administrator || false);
      
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
    setIsAdmin(false)
    navigate("/", { replace: true });
  };

  return { authenticated, loading, login, logout, isAdmin };
}
