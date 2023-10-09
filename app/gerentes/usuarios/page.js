"use client"
import TabelaUsuarios from "@/app/componentes/tabelas/TabelaUsuarios";
import Cabecalho from "@/app/componentes/templates/Cabecalho";
import Menu from "@/app/componentes/templates/Menu";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado";
import USUARIOS from "@/app/componentes/estados/useUsuarios";
import { useState } from "react";
import UsuariosHome from "@/app/componentes/templates/HomeUsuario";
import TabelaForncedores from "@/app/componentes/tabelas/TabelaFornecedor";
import TabelaClientes from "@/app/componentes/tabelas/TabelaClientes";

export default function GerUsuarios() {
    const [Usuario, setUsuarios] = useState(USUARIOS.telahome);

    if (Usuario === USUARIOS.telahome) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR USUÁRIOS"/>
                <UsuariosHome mudaTela={setUsuarios}/>
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telafunc) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR FUNCIONÁRIOS"/>
                <TabelaUsuarios mudaTela={setUsuarios}/>
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telaforn) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR FORNECEDORES"/>
                <TabelaForncedores mudaTela={setUsuarios}/>
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telacli) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR CLIENTES"/>
                <TabelaClientes mudaTela={setUsuarios}/>
                <RodapeLogado />
            </main>
        );
    }
}