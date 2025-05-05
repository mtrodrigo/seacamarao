import Productscontainer from "../../components/containers/Productscontainer";
import frente from "../../assets/frente.png";
import freezer1 from "../../assets/freezer1.png";
import freezer2 from "../../assets/freezer2.png";
import freezer3 from "../../assets/freezer3.png";

const About = () => {
  return (
    <Productscontainer>
      <h1 className="text-2xl font-bold text-zinc-200 mb-8 text-center">
        Sobre
      </h1>
      <p className="text-zinc-200 max-w-4xl mb-6 text-center mx-auto">
        SEA CAMARÃO trabalha com camarão cinza de cultivo, criados em cativeiros
        de água salgada vindo diretamente das fazendas no Rio Grande do Norte e
        todos os demais Frutos do Mar.
      </p>
      <img className="mb-3" src={frente} alt="Foto faixada" />
      <h2 className="text-xl text-zinc-200 max-w-4xl mb-6 text-center mx-auto">
        Produtos sempre fesquinhos diratamente do produtor para você.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-4xl mb-6">
        <img src={freezer1} alt="Foto do freezer 1" />
        <img src={freezer2} alt="Foto do freezer 2" />
        <img src={freezer3} alt="Foto do freezer 3" />
      </div>
      <h2 className="text-xl text-zinc-200 max-w-4xl mb-6 text-center mx-auto">
        Entregas
      </h2>
      <p className="text-zinc-200 max-w-4xl mb-6 text-center mx-auto">
        Alfenas, MG · Machado, MG · Carvalhópolis, MG · Areado, MG · Varginha,
        MG · Conceição da Aparecida, MG · Extrema, MG · Pouso Alegre, MG · Carmo
        do Rio Claro, MG · Cambuí, MG
      </p>
      <h2 className="text-xl text-zinc-200 max-w-4xl mb-6 text-center mx-auto">
        Localização
      </h2>
      <iframe
        className="max-w-9/10 sm:max-w-4xl w-full h-52 mb-6 mx"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352.8482945865247!2d-45.737969192599856!3d-21.550271070699647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca65542c571a83%3A0x97a5c474530b9192!2sSea%20Camar%C3%A3o%20Peixaria%20em%20Paragua%C3%A7u%20-%20Atacado%20e%20Varejo!5e0!3m2!1spt-BR!2sbr!4v1746450267184!5m2!1spt-BR!2sbr"
      />
      <p className="text-zinc-200 max-w-4xl mb-6 text-center mx-auto">
        Rua Eustáquio Júnior, 180 - Centro, Paraguaçu - MG
      </p>
    </Productscontainer>
  );
};

export default About;
