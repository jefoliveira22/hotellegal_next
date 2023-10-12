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
import CADFuncionario from "@/app/componentes/formularios/Funcionarios";
import ipBackend from "@/app/componentes/IPBackend";
import confirmaGravação from "@/app/componentes/alertas/Gravacao";
import CADFornecedor from "@/app/componentes/formularios/Fornecedores";
import CADCliente from "@/app/componentes/formularios/Clientes";
import confirmaRemocao from "@/app/componentes/alertas/Remocao";
import confirmaAtualização from "@/app/componentes/alertas/Atualizacao";


export default function GerUsuarios() {

    const [Usuario, setUsuarios] = useState(USUARIOS.telahome); /* ESTADO QUE GERENCIA A OPÇÃO USUÁRIOS (MONTA AS TELAS DE FUNCIONARIO, FORNECEDOR, CLIENTE E TELA HOME) */
    const [Clientes, setClientes] = useState(CLIENTES.listcliente); /* ESTADO QUE GERENCIA A OPÇÃO CLIENTES (MONTA TELA DE CADASTRO, ATUALIZAÇÃO E LISTAGEM) */
    const [Fornecedores, setFornecedores] = useState(FORNECEDORES.listfornecedor); /* ESTADO QUE GERENCIA A OPÇÃO FORNECEDORES (MONTA TELA DE CADASTRO, ATUALIZAÇÃO E LISTAGEM) */
    const [Funcionarios, setFuncionarios] = useState(FUNCIONARIOS.listfuncionario); /* ESTADO QUE GERENCIA A OPÇÃO FUNCIONÁRIOS (MONTA TELA DE CADASTRO, ATUALIZAÇÃO E LISTAGEM) */
    const [AtuFuncionario, setAtuFuncionario] = useState([]); /* ESTADO QUE ARMAZENA A LINHA DA TABELA CONTENDO OS DADOS DO FUNCIONÁRIO QUE VAI SER ATUALIZADO */
    const [AtuFornecedor, setAtuFornecedor] = useState([]); /* ESTADO QUE ARMAZENA A LINHA DA TABELA CONTENDO OS DADOS DO FORNECEDOR QUE VAI SER ATUALIZADO */
    const [AtuCliente, setAtuCliente] = useState([]); /* ESTADO QUE ARMAZENA A LINHA DA TABELA CONTENDO OS DADOS DO CLIENTE QUE VAI SER ATUALIZADO */

    /* FUNÇÕES DE ADIÇÃO, ATUALIZAÇÃO, E REMOÇÃO PARA FUNCIONÁRIOS */

    function cadastrarFuncionario(dados) { /* FUNÇÃO QUE É EXECUTADA AO CADASTRAR UM USUÁRIO, ONDE RECEBE O JSON VINDO DA PAGINA DE CADASTRO */
        fetch(ipBackend + "funcionario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((confirmacao) => {
            confirmaGravação(confirmacao);
            setFuncionarios(FUNCIONARIOS.listfuncionario);
        }).catch((erro) => {
            alertaErro(erro);
            setFuncionarios(FUNCIONARIOS.listfuncionario);
        });
    }

    function prepararAtualizacaoFuncionario(funcionario) { /* FUNÇÃO QUE ACIONA O CARREGAMENTO DA TELA DE ATUALIZAÇÃO E SALVA OS DADOS DO FUNCIONARIO QUE VAI SER ATUALIZADO */
        setAtuFuncionario(funcionario);
        setFuncionarios(FUNCIONARIOS.atufuncionario);
    }

    function atualizarFuncionario(dados) { /* FUNÇÃO QUE EXECUTA A ATUALIZAÇÃO DO FUNCIONÁRIO NO BACKEND */
        fetch(ipBackend + "funcionario", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((mensagem) =>{
            confirmaAtualização(mensagem);
            setFuncionarios(FUNCIONARIOS.listfuncionario);
        });
    }

    function prepararRemocaoFuncionario(funcionario) { /* FUNÇÃO QUE MANIPULA A INFORMAÇÃO A SER REMOVIDA E ATUALIZA A TABELA APÓS O PROCESSO */
        apagarFuncionario(funcionario);
        setFuncionarios(FUNCIONARIOS.listfuncionario);
    }

    function apagarFuncionario(funcionario) { /* FUNÇÃO QUE ENVIA O ITEM A SER REMOVIDO AO BACKEND */
        const ID = { usuario_id: funcionario.usuario_id }
        fetch(ipBackend + 'funcionario',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ID)
            }).then((resposta) => {
                return resposta.json();
            }).then((mensagem) => {
                confirmaRemocao(mensagem);
            }).catch((erro) => {
                alertaErro(erro);
            });
    }

    /* FUNÇÕES DE ADIÇÃO, ATUALIZAÇÃO, E REMOÇÃO PARA FORNECEDORES */

    function cadastrarFornecedor(dados) { /* FUNÇÃO QUE É EXECUTADA AO CADASTRAR UM FORNECEDOR, ONDE RECEBE O JSON VINDO DA PAGINA DE CADASTRO */
        fetch(ipBackend + "fornecedor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((confirmacao) => {
            confirmaGravação(confirmacao);
            setFornecedores(FORNECEDORES.listfornecedor);
        }).catch((erro) => {
            alertaErro(erro);
            setFornecedores(FORNECEDORES.listfornecedor);
        });
    }

    function prepararAtualizacaoFornecedor(fornecedor) { /* FUNÇÃO QUE ACIONA O CARREGAMENTO DA TELA DE ATUALIZAÇÃO E SALVA OS DADOS DO FORNECEDOR QUE VAI SER ATUALIZADO */
        setAtuFornecedor(fornecedor);
        setFornecedores(FORNECEDORES.atufornecedor);
    }

    function atualizarFornecedor(dados) { /* FUNÇÃO QUE EXECUTA A ATUALIZAÇÃO DO FORNECEDOR NO BACKEND */
        fetch(ipBackend + "fornecedor", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((mensagem) => {
            confirmaAtualização(mensagem);
            setFornecedores(FORNECEDORES.listfornecedor);
        });
    }

    function prepararRemocaoFornecedor(fornecedor) { /* FUNÇÃO QUE MANIPULA A INFORMAÇÃO A SER REMOVIDA E ATUALIZA A TABELA APÓS O PROCESSO */
        apagarFornecedor(fornecedor);
        setFornecedores(FORNECEDORES.listfornecedor);
    }

    function apagarFornecedor(fornecedor) { /* FUNÇÃO QUE ENVIA O ITEM A SER REMOVIDO AO BACKEND */
        const ID = { usuario_id: fornecedor.usuario_id }
        fetch(ipBackend + 'fornecedor',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ID)
            }).then((resposta) => {
                return resposta.json();
            }).then((mensagem) => {
                confirmaRemocao(mensagem);
            }).catch((erro) => {
                alertaErro(erro);
            });
    }

    /* FUNÇÕES DE ADIÇÃO, ATUALIZAÇÃO, E REMOÇÃO PARA CLIENTES */

    function cadastrarCliente(dados) { /* FUNÇÃO QUE É EXECUTADA AO CADASTRAR UM CLIENTE, ONDE RECEBE O JSON VINDO DA PAGINA DE CADASTRO */
        fetch(ipBackend + "cliente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((confirmacao) => {
            confirmaGravação(confirmacao);
            setClientes(CLIENTES.listcliente);
        }).catch((erro) => {
            alertaErro(erro);
            setClientes(CLIENTES.listcliente);
        });
    }

    function prepararAtualizacaoCliente(cliente) { /* FUNÇÃO QUE ACIONA O CARREGAMENTO DA TELA DE ATUALIZAÇÃO E SALVA OS DADOS DO CLIENTE QUE VAI SER ATUALIZADO */
        setAtuCliente(cliente);
        setClientes(CLIENTES.atucliente);
    }

    function atualizarCliente(dados) { /* FUNÇÃO QUE EXECUTA A ATUALIZAÇÃO DO CLIENTE NO BACKEND */
        fetch(ipBackend + "cliente", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((mensagem) => {
            confirmaAtualização(mensagem);
            setClientes(CLIENTES.listcliente);
        });
    }

    function prepararRemocaoCliente(cliente) { /* FUNÇÃO QUE MANIPULA A INFORMAÇÃO A SER REMOVIDA E ATUALIZA A TABELA APÓS O PROCESSO */
        apagarCliente(cliente);
        setClientes(CLIENTES.listcliente);
    }

    function apagarCliente(cliente) { /* FUNÇÃO QUE ENVIA O ITEM A SER REMOVIDO AO BACKEND */
        const ID = { usuario_id: cliente.usuario_id }
        fetch(ipBackend + 'cliente',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ID)
            }).then((resposta) => {
                return resposta.json();
            }).then((mensagem) => {
                confirmaRemocao(mensagem);
            }).catch((erro) => {
                alertaErro(erro);
            });
    }

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
                <TabelaFuncionarios mudaTela={setUsuarios}
                    mudaFuncionario={setFuncionarios}
                    prepAtualizacao={prepararAtualizacaoFuncionario}
                    prepRemocao={prepararRemocaoFuncionario}
                />
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telafunc && Funcionarios === FUNCIONARIOS.cadfuncionario) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ADICIONAR FUNCIONÁRIO" />
                <CADFuncionario mudaFuncionario={setFuncionarios}
                    cadastraFunc={cadastrarFuncionario} />
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telafunc && Funcionarios === FUNCIONARIOS.atufuncionario) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR FUNCIONÁRIO" />
                <CADFuncionario mudaFuncionario={setFuncionarios}
                    exeAtualizacao={atualizarFuncionario}
                    atualizaFuncionario={AtuFuncionario}
                />
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
                <TabelaFornecedores mudaTela={setUsuarios}
                    mudaFornecedor={setFornecedores}
                    prepAtualizacao={prepararAtualizacaoFornecedor}
                    prepRemocao={prepararRemocaoFornecedor} />
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telaforn && Fornecedores === FORNECEDORES.cadfornecedor) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ADICIONAR FORNECEDOR" />
                <CADFornecedor mudaFornecedor={setFornecedores}
                    cadastraForn={cadastrarFornecedor} />
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telaforn && Fornecedores === FORNECEDORES.atufornecedor) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR FORNECEDOR" />
                <CADFornecedor mudaFornecedor={setFornecedores}
                    exeAtualizacao={atualizarFornecedor}
                    atualizaFornecedor={AtuFornecedor} />
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
                <TabelaClientes mudaTela={setUsuarios}
                    mudaCliente={setClientes}
                    prepAtualizacao={prepararAtualizacaoCliente}
                    prepRemocao={prepararRemocaoCliente} />
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telacli && Clientes === CLIENTES.cadcliente) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ADICIONAR CLIENTE" />
                <CADCliente mudaCliente={setClientes}
                    cadastraCli={cadastrarCliente} />
                <RodapeLogado />
            </main>
        );
    }

    else if (Usuario === USUARIOS.telacli && Clientes === CLIENTES.atucliente) {
        return (
            <main>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR CLIENTE" />
                <CADCliente mudaCliente={setClientes}
                    exeAtualizacao={atualizarCliente}
                    atualizaCliente={AtuCliente} />
                <RodapeLogado />
            </main>
        );
    }
}