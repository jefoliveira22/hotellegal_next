"use client"
import { useEffect, useState } from "react";
import FormCADDespesa from "@/app/componentes/formularios/CADDespesa.js";
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import Menu from "@/app/componentes/templates/Menu.js";
import TabelaDespesas from "@/app/componentes/tabelas/TabelaDespesa.js";
import DESPESA from "@/app/componentes/estados/useDespesa.js";
import FormATUDespesa from "@/app/componentes/formularios/ATUDespesa.js";
import TabelaTipoDespesas from "@/app/componentes/tabelas/TabelaTDespesa.js";
import FormTDespesa from "@/app/componentes/formularios/TiposDespesa";
import ipBackend from "@/app/componentes/IPBackend.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado";

export default function TelaCadDespesa() {
    
    const [despesa, setDespesa] = useState(DESPESA.listagem);
    const [listaDespesas, setListaDespesas] = useState([]);
    const [atualizaDespesa, setAtualizaDespesa] = useState([]);
    const [buscaID, setBuscaID] = useState([]);
    const [busca, setBusca] = useState(false);
    const [tiposDespesa, setTiposDespesa] = useState([]);
    
    useEffect (() => {
        if (!busca) {
            fetch(ipBackend + 'despesa',
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setListaDespesas(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
        }
        else {
            fetch(ipBackend + 'despesa/' + buscaID,
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setListaDespesas(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
        }
    });

    function buscarTiposDespesas() {
        fetch(ipBackend + 'tdespesa',
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setTiposDespesa(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
    }

    function apagarDespesa(despesas) {
        const id_despesa = { id_despesa: despesas.id_despesa }
        fetch(ipBackend + 'despesa',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id_despesa)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Despesa excluída com sucesso!")
                }
                else {
                    alert("Não foi possível excluir despesa.")
                }
            });
    }

    function apagarTDespesa(tdespesa) {
        const cod_tipo_desp = {cod_tipo_desp: tdespesa.cod_tipo_desp}
        fetch(ipBackend + 'tdespesa',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cod_tipo_desp)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Tipo de despesa excluída com sucesso!");
                }
                else {
                    alert("Não foi possível excluir o tipo de despesa.")
                }
            });
    }

    function prepararRemocaoTDespesa(tdespesa) {
        apagarTDespesa(tdespesa);
        setDespesa(DESPESA.listatipodespesa);
    }

    function prepararAtualizacao(despesas) {
        setAtualizaDespesa(despesas);
        setDespesa(DESPESA.atualizar);
        
    }

    function prepararRemocao(despesas) {
        apagarDespesa(despesas);
        setDespesa(DESPESA.listagem);
    }
    
    if (despesa === DESPESA.listagem) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR DESPESAS" />
                <TabelaDespesas exibirDespesa={setDespesa}
                    dadosDespesas={listaDespesas}
                    editarDespesas={prepararAtualizacao}
                    apagarDespesas={prepararRemocao}
                    dadosID={setBuscaID}
                    escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (despesa === DESPESA.cadastro) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="CADASTRAR DESPESA" />
                <FormCADDespesa exibirDespesa={setDespesa} escolheBusca={setBusca}/>
                <RodapeLogado />
            </div>
        );
    }

    else if (despesa === DESPESA.atualizar) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR DESPESA" />
                <FormATUDespesa exibirDespesa={setDespesa} listaDespesas={atualizaDespesa} escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (despesa === DESPESA.cadastrotipodespesa) {
        return (
            <div>
                <Menu/>
                <Cabecalho titulopagina="CADASTRAR TIPO DE DESPESA"/>
                <FormTDespesa exibirDespesa={setDespesa} escolheBusca={setBusca}/>
                <RodapeLogado />
            </div>
        );
    }

    else if (despesa === DESPESA.listatipodespesa) {
        buscarTiposDespesas();
        return (
            <div>
                <Menu/>
                <Cabecalho titulopagina="LISTAR TIPOS DE DESPESA"/>
                <TabelaTipoDespesas exibirDespesa={setDespesa} 
                                    escolheBusca={setBusca}
                                    dados={tiposDespesa}
                                    apagarTDespesa={prepararRemocaoTDespesa}/>
                <RodapeLogado />
            </div>
        );
    }
}