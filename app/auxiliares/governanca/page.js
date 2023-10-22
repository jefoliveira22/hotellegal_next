"use client"
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import CAMAREIRO from "@/app/componentes/estados/useCamareiro.js";
import { useState, useEffect } from "react";
import ipBackend from "@/app/componentes/IPBackend.js";
import TabelaATVCamareiro from "@/app/componentes/tabelas/TabelaAtvCamareiro.js";
import TelaCADATVCamareiro from "@/app/componentes/formularios/ATVCamareiro.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import confirmaGravação from "@/app/componentes/alertas/Gravacao.js";
import confirmaAtualização from "@/app/componentes/alertas/Atualizacao.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado.js";
import MenuAuxServico from "@/app/componentes/templates/MenuAuxServico";

export default function TelaGovernanca() {

    const [estadoTela, setEstadoTela] = useState(CAMAREIRO.listaatv);
    const [valorBusca, setValorBusca] = useState([]);
    const [atvCamareiros, setAtvCamareiros] = useState([]);
    const [atualizarATVCamareiro, setAtualizaATVCamareiro] = useState([]);
    const [buscaATV, setBuscaATV] = useState(true);

    useEffect(() => {
        if (buscaATV) {
            fetch(ipBackend + 'atvcamareiro',
                {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setAtvCamareiros(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
        }
        else {
            fetch(ipBackend + 'atvcamareiro/' + valorBusca,
                {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setAtvCamareiros(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
        }
    }, [])

    function cadastrarATVCamareiros(atvcamareiros) {
        fetch(ipBackend + "atvcamareiro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atvcamareiros)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function prepararAtualizacaoATVCamareiro(atvcamareiro) {
        setAtualizaATVCamareiro(atvcamareiro);
        setEstadoTela(CAMAREIRO.atualizaatv);
    }

    function atualizarATVCamareiros(atvcamareiros) {
        fetch(ipBackend + "atvcamareiro", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atvcamareiros)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
            setEstadoTela(CAMAREIRO.listaatv);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function removerATVCamareiro(atvcamareiro) {
        const ID = { id_atv: atvcamareiro.id_atv }
        fetch(ipBackend + 'atvcamareiro',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ID)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Atividade removida com sucesso!")
                }
                else {
                    alert("Não foi possível remover a atividade.")
                }
            });
        setEstadoTela(CAMAREIRO.listaatv);
    }

    if (estadoTela === CAMAREIRO.listaatv) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="ATIVIDADES CADASTRADAS" />
                <TabelaATVCamareiro mudaTela={setEstadoTela}
                    listaAtvCamareiros={atvCamareiros}
                    exeAtualizacaoATV={prepararAtualizacaoATVCamareiro}
                    exeRemocao={removerATVCamareiro}
                    cpfBusca={setValorBusca}
                    modoBusca={setBuscaATV} />
                <RodapeLogado />
            </div>
        );
    }

    else if (estadoTela === CAMAREIRO.cadastraatv) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="CADASTRAR ATIVIDADE" />
                <TelaCADATVCamareiro mudaTela={setEstadoTela} exCadATV={cadastrarATVCamareiros} />
                <RodapeLogado />
            </div>
        );
    }

    else if (estadoTela === CAMAREIRO.atualizaatv) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="ATUALIZAR ATIVIDADE" />
                <TelaCADATVCamareiro mudaTela={setEstadoTela}
                    atuATVCamareiros={atualizarATVCamareiro}
                    exAtuATV={atualizarATVCamareiros} />
                <RodapeLogado />
            </div>
        );
    }
}