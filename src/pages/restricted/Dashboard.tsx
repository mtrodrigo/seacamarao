import { HeaderBottom } from "../../components/buttons/HeaderBottom";
import RegisterContainer from "../../components/containers/RegisterContainer";

const Dashboard = () => {
  return (
    <RegisterContainer>
      <h1 className="text-2xl text-zinc-200 mb-5">Dashboard</h1>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
        <HeaderBottom to="/" text="Cadastrar produtos" />
        <HeaderBottom to="/" text="Editar produtos" />
        <HeaderBottom to="/" text="Usuários cadastrados" />
        <HeaderBottom 
            to="/"
            text="Histórico completo"
        />
        
      </div>
      <div>
        <h2 className="text-xl text-zinc-200 mb-2">Histórco de pedidos não atendindos</h2>
        <table className="text-zinc-200">
            <thead>
                <tr>
                    <td>Data</td>
                    <td>Cliente</td>
                    <td>Cidade</td>
                    <td>Telefone</td>
                    <td></td>
                </tr>
            </thead>
        </table>
      </div>
    </RegisterContainer>
  );
};

export default Dashboard;
