import { useEffect, useState } from "react";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import api from "../../../utils/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  cpf_cnpj: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  administrator: boolean;
}

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getAuthToken = (): string | null => {
    const token = localStorage.getItem("seacamarao-token");
    return token ? JSON.parse(token) : null;
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/getall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else if (response.data && response.data.message) {
          console.log("Server message:", response.data.message);
          toast.error("No users data received from server");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <RegisterContainer>
        <div className="flex justify-center items-center h-full">
          <CircularProgress size={24} sx={{ color: "#e4e4e7" }} />
        </div>
      </RegisterContainer>
    );
  }

  return (
    <RegisterContainer>
      <h1 className="text-2xl text-zinc-200 font-bold mb-5">
        Usuários cadastrados
      </h1>
      <small className="w-full text-zinc-200 text-center">
        Para detalhes clique em <AddIcon />
      </small>
      <table className="w-full text-center text-zinc-200 text-sm">
        <thead>
          <tr className="bg-zinc-600 border-b border-zinc-800">
            <th className="px-2 py-2">Nome</th>
            <th className="px-2 py-2">CPF/CNPJ</th>
            <th className="px-2 py-2">Cidade</th>
            <th className="px-2 py-2">Admin</th>
            <th className="px-2 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t border-zinc-700">
              <td className="px-2 py-2">{user.name}</td>
              <td className="px-2 py-2">{user.cpf_cnpj}</td>
              <td className="px-2 py-2">{user.city}</td>
              <td className="px-2 py-2">{user.administrator ? "Sim" : ""}</td>
              <td className="px-2 py-2">
                <Link to={`/restricted/users/userdetails/${user._id}`}>
                  <AddIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </RegisterContainer>
  );
};

export default ShowUsers;
