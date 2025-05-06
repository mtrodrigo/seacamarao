import { HeaderBottom } from "../../components/buttons/HeaderBottom";

const AccessDenied = () => {
    return(
        <div className="flex flex-col items-center justify-center gap-7">
            <h1 className="text-4xl text-orange-500">Acesso Negado</h1>
            <HeaderBottom 
                to="/"
                text="Página inicial"
            />
        </div>
    )
}

export default AccessDenied