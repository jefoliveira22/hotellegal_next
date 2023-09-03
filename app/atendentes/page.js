'use client'
import Cabecalho from "../componentes/templates/Cabecalho";
import MenuAtendente from "../componentes/templates/MenuAtendente";
import RodapeLogado from "../componentes/templates/RodapeLogado";
import DashAtendente from "../componentes/templates/dashAtendente";

export default function PaginaAtendente() {
    return (
        <main>
            <MenuAtendente />
            <Cabecalho />
            <DashAtendente />
            <RodapeLogado />
        </main>
    );
}