import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { User } from "./ShowUsers";
import toast from "react-hot-toast";
import api from "../../../utils/api";
import RegisterContainer from "../../../components/containers/RegisterContainer";
import { CircularProgress } from "@mui/material";

const UserDetails = () => {
    const { id } = useParams()
    const [token] = useState(localStorage.getItem("seacamarao-token"));
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
          const fetchData = async () => {
            try {
              const response = await api.get(`/users/${id}`, {
                headers: {
                  Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
                },
              });
              setLoading(response.data);
            } catch (error) {
              console.error("Error: ", error);
              toast.error("Erro ao carregar o usuário");
              navigate("/restricted/users/showusers");
            } finally {
              setLoading(false);
            }
          };
          fetchData();
        } catch (error) {
          console.error("Error: ", error);
          setLoading(false);
          toast.error("Erro ao carregar o usuário");
          navigate("/restricted/users/showusers");
        }
      }, []);

      console.log(user);
      

      if (loading) {
        return (
          <RegisterContainer>
            <div className="flex justify-center items-center h-64">
              <CircularProgress style={{ color: "#e4e4e7" }} size={40} />
            </div>
          </RegisterContainer>
        );
      }

    return(
        <div>
            
        </div>
    )
}

export default UserDetails