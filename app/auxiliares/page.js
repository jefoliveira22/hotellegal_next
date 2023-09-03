'use client'
import Cabecalho from "../componentes/templates/Cabecalho";
import MenuAuxServico from "../componentes/templates/MenuAuxServico";
import RodapeLogado from "../componentes/templates/RodapeLogado";
import DashAuxiliar from "../componentes/templates/dashAuxiliar";

export default function PaginaAtendente() {
    return (
        <main>
            <MenuAuxServico />
            <Cabecalho />
            <DashAuxiliar />
            <RodapeLogado />
        </main>
    );
}