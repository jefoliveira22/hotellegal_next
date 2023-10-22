"use client"
import { useEffect, useState } from "react";
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import Menu from "@/app/componentes/templates/Menu.js";
import TabelaQuartos from "@/app/componentes/tabelas/TabelaQuarto.js";
import QUARTO from "@/app/componentes/estados/useQuarto.js";
import ipBackend from "@/app/componentes/IPBackend.js";
import FormATUQuarto from "@/app/componentes/formularios/ATUQuarto.js";
import FormCADQuarto from "@/app/componentes/formularios/CADQuarto.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado.js";
import MenuAuxServico from "@/app/componentes/templates/MenuAuxServico";

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
                <MenuAuxServico />
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
                <MenuAuxServico />
                <Cabecalho titulopagina="CADASTRAR QUARTOS" />
                <FormCADQuarto exibirQuarto={setQuarto} escolheBusca={setBusca}/>
                <RodapeLogado />
            </div>
        );
    }

    else if (Quarto === QUARTO.atualizar) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="ATUALIZAR QUARTOS" />
                <FormATUQuarto exibirQuarto={setQuarto} listaQuarto={atualizaQuarto} escolheBusca={setBusca}/>
                <RodapeLogado />
            </div>
        );
    }
}