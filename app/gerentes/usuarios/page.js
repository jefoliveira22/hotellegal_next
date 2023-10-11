"use client"
import TabelaFuncionarios from "@/app/componentes/tabelas/TabelaFuncionarios";
import Cabecalho from "@/app/componentes/templates/Cabecalho";
import Menu from "@/app/componentes/templates/Menu";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado";
import USUARIOS from "@/app/componentes/estados/useUsuarios";
import { useState } from "react";
import UsuariosHome from "@/app/componentes/templates/HomeUsuario";
import TabelaFornecedores from "@/app/componentes/tabelas/TabelaFornecedor";
import TabelaClientes from "@/app/componentes/tabelas/TabelaClientes";
import CLIENTES from "@/app/componentes/estados/useClientes";
import FORNECEDORES from "@/app/componentes/estados/useFornecedores";
import FUNCIONARIOS from "@/app/componentes/estados/useFuncionarios";
import alertaErro from "@/app/componentes/alertas/Erro";


export default function GerUsuarios() {

    const [Usuario, setUsuarios] = useState(USUARIOS.telahome); /* ESTADO QUE GERENCIA A OPÇÃO USUÁRIOS (MONTA AS TELAS DE FUNCIONARIO, FORNECEDOR, CLIENTE E TELA HOME) */
    const [Clientes, setClientes] = useState(CLIENTES.listcliente); /* ESTADO QUE GERENCIA A OPÇÃO CLIENTES (MONTA TELA DE CADASTRO, ATUALIZAÇÃO E LISTAGEM) */
    const [Fornecedores, setFornecedores] = useState(FORNECEDORES.listfornecedor); /* ESTADO QUE GERENCIA A OPÇÃO FORNECEDORES (MONTA TELA DE CADASTRO, ATUALIZAÇÃO E LISTAGEM) */
    const [Funcionarios, setFuncionarios] = useState(FUNCIONARIOS.listfuncionario); /* ESTADO QUE GERENCIA A OPÇÃO FUNCIONÁRIOS (MONTA TELA DE CADASTRO, ATUALIZAÇÃO E LISTAGEM) */


    /* MONTAGEM DA TELA ÚNICA - TELA HOME COM OPÇÕES (FUNCIONARIOS, FORNECEDORES E CLIENTES) */

    if (Usuario === USUARIOS.telahome) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR USUÁRIOS" />
                <UsuariosHome mudaTela={setUsuarios} />
                <RodapeLogado />
            </main>
        );
    }

    /* MONTAGEM DA TELA ÚNICA - OPÇÃO FUNCIONÁRIOS */

    else if (Usuario === USUARIOS.telafunc && Funcionarios === FUNCIONARIOS.listfuncionario) { /* CONDIÇÃO PARA MONTAR A PÁGINA = SE O ESTADO USUARIO FOR "telafunc" */
            return (                                                                         /*  E O ESTADO FUNCIONARIO FOR "listfuncionario", CARREGAR A TABELA FUNCIONÁRIOS */                                               
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR FUNCIONÁRIOS" />
                <TabelaFuncionarios mudaTela={setUsuarios}/>
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telafunc && Funcionarios === FUNCIONARIOS.cadfuncionario) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ADICIONAR FUNCIONÁRIO" />

                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telafunc && Funcionarios === FUNCIONARIOS.atufuncionario) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR FUNCIONÁRIO" />
                <RodapeLogado />
            </main>
        );
    }

    /* MONTAGEM DA TELA ÚNICA - OPÇÃO FORNECEDORES  */

    else if (Usuario === USUARIOS.telaforn && Fornecedores === FORNECEDORES.listfornecedor) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR FORNECEDORES" />
                <TabelaFornecedores mudaTela={setUsuarios}/>
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telaforn && Fornecedores === FORNECEDORES.cadfornecedor) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ADICIONAR FORNECEDOR" />

                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telaforn && Fornecedores === FORNECEDORES.atufornecedor) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR FORNECEDOR" />

                <RodapeLogado />
            </main>
        );
    }

    /* MONTAGEM DA TELA ÚNICA - OPÇÃO CLIENTES */

    else if (Usuario === USUARIOS.telacli && Clientes === CLIENTES.listcliente) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR CLIENTES" />
                <TabelaClientes mudaTela={setUsuarios}/>
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telacli && Clientes === CLIENTES.cadcliente) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ADICIONAR CLIENTE" />

                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telacli && Clientes === CLIENTES.atucliente) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR CLIENTE" />

                <RodapeLogado />
            </main>
        );
    }
}