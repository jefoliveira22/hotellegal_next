'use client'
import Cabecalho from "../componentes/templates/Cabecalho";
import Menu from "../componentes/templates/Menu";
import RodapeLogado from "../componentes/templates/RodapeLogado";
import DashGerente from "../componentes/templates/dashGerente";

export default function PaginaGerente() {
    return (
        <main>
            <Menu />
            <Cabecalho />
            <DashGerente />
            <RodapeLogado />
        </main>
    );
}