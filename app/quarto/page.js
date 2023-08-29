"use client"
import { useEffect, useState } from "react";
import Cabecalho from "../componentes/templates/Cabecalho.js";
import Menu from "../componentes/templates/Menu.js";
import TabelaQuartos from "../componentes/tabelas/TabelaQuarto.js";
import QUARTO from "../componentes/estados/useQuarto.js";
import ipBackend from "../componentes/IPBackend.js";
import FormATUQuarto from "../componentes/formularios/ATUQuarto.js";
import FormCADQuarto from "../componentes/formularios/CADQuarto.js";
import alertaErro from "../componentes/alertas/Erro.js";
import RodapeLogado from "../componentes/templates/RodapeLogado.js";

export default function TelaCadQuarto() {

    const [Quarto, setQuarto] = useState(QUARTO.listagem);
    const [listaQuartos, setListaQuartos] = useState([]);
    const [atualizaQuarto, setAtualizaQuarto] = useState([]);
    const [buscaID, setBuscaID] = useState([]);
    const [busca, setBusca] = useState(false);

    useEffect (() => {
        if (!busca) {
            fetch(ipBackend + 'quarto',
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setListaQuartos(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
        }
        else {
            fetch(ipBackend + 'quarto/' + buscaID,
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setListaQuartos(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
        }
    });

    function apagarQuarto(quartos) {
        const idquarto = { idquarto: quartos.idquarto }
        fetch(ipBackend + 'quarto',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idquarto)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Quarto excluído com sucesso!")
                }
                else {
                    alert("Não foi possível excluir o quarto.")
                }   
            });
    }

    function prepararAtualizacao(quartos) {
        setQuarto(QUARTO.atualizar);
        setAtualizaQuarto(quartos);
    }

    function prepararRemocao(quartos) {
        apagarQuarto(quartos);
        setQuarto(QUARTO.listagem);
    }

    if (Quarto === QUARTO.listagem) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR QUARTOS" />
                <TabelaQuartos exibirQuarto={setQuarto}
                    dadosQuarto={listaQuartos}
                    editarQuartos={prepararAtualizacao}
                    apagarQuartos={prepararRemocao}
                    dadosID={setBuscaID}
                    escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (Quarto === QUARTO.cadastro) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="CADASTRAR QUARTOS" />
                <FormCADQuarto exibirQuarto={setQuarto} escolheBusca={setBusca}/>
                <RodapeLogado />
            </div>
        );
    }

    else if (Quarto === QUARTO.atualizar) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR QUARTOS" />
                <FormATUQuarto exibirQuarto={setQuarto} listaQuarto={atualizaQuarto} escolheBusca={setBusca}/>
                <RodapeLogado />
            </div>
        );
    }
}