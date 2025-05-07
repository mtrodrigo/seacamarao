import { useContext, useEffect, useState } from "react";
import { HeaderBottom } from "../../components/buttons/HeaderBottom";
import RegisterContainer from "../../components/containers/RegisterContainer";
import { Context } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {
  

  return (
    <RegisterContainer>
      <h1 className="text-2xl text-zinc-200 mb-5">Dashboard</h1>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
        <HeaderBottom to="/" text="Cadastrar produtos" />
        <HeaderBottom to="/" text="Editar produtos" />
        <HeaderBottom to="/" text="Usuários cadastrados" />
        <HeaderBottom to="/" text="Histórico completo" />
      </div>
      <div>
        <h2 className="text-xl text-zinc-200 mb-2">
          Histórco de pedidos não atendindos
        </h2>
        <table className="text-zinc-200">
          <thead>
            <tr>
              <th>Data</th>
              <th>Cliente</th>
              <th>Cidade</th>
              <th>Telefone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </RegisterContainer>
  );
};

export default Dashboard;
