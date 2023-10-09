import TabelaUsuarios from "@/app/componentes/tabelas/TabelaUsuarios";
import Cabecalho from "@/app/componentes/templates/Cabecalho";
import Menu from "@/app/componentes/templates/Menu";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado";

export default function GerUsuarios() {
    return (
        <div>
            <Menu />
            <Cabecalho titulopagina="GERENCIAR USUÁRIOS" />
            <TabelaUsuarios />
            <RodapeLogado />
        </div>
    );
}