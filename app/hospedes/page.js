'use client'
import Cabecalho from "../componentes/templates/Cabecalho";
import MenuHospede from "../componentes/templates/MenuHospede";
import RodapeLogado from "../componentes/templates/RodapeLogado";
import DashHospede from "../componentes/templates/dashHospede";

export default function PaginaHospede() {
    return (
        <main>
            <MenuHospede />
            <Cabecalho />
            <DashHospede />
            <RodapeLogado />
        </main>
    );
}