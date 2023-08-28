"use client"
import { useEffect, useState } from "react";
import FormCADHospede from "../componentes/formularios/CADHospede.js";
import Cabecalho from "../componentes/templates/Cabecalho.js";
import Menu from "../componentes/templates/Menu.js";
import TabelaHospedes from "../componentes/tabelas/TabelaHospede.js";
import HOSPEDE from "../componentes/estados/useHospede.js";
import FormATUHospede from "../componentes/formularios/ATUHospede.js";
import ipBackend from "../componentes/IPBackend.js";
import alertaErro from "../componentes/alertas/Erro.js";
import confirmaRemocao from "../componentes/alertas/Remocao.js";

export default function TelaCadHospede() {

    const [hospede, setHospede] = useState(HOSPEDE.listagem);
    const [listaHospedes, setListaHospedes] = useState([]);
    const [atualizaHospede, setAtualizaHospede] = useState([]);
    const [buscaCPF, setBuscaCPF] = useState([]);
    const [busca, setBusca] = useState(false);

    useEffect (() => {
        if (!busca) {
            fetch(ipBackend + 'hospede',
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setListaHospedes(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
        }
        else {
            fetch(ipBackend + 'hospede/' + buscaCPF,
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setListaHospedes(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
        }
    });

    function apagarHospede(hospedes) {
        const cpf = { cpf: hospedes.cpf }
        fetch(ipBackend + 'hospede',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cpf)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                confirmaRemocao(dados);
            }).catch((erro) => {
                alertaErro(erro);
            });
    }

    function prepararAtualizacao(hospedes) {
        setHospede(HOSPEDE.atualizar);
        setAtualizaHospede(hospedes);
    }

    function prepararRemocao(hospedes) {
        apagarHospede(hospedes);
        setHospede(HOSPEDE.listagem);
    }

    if (hospede === HOSPEDE.listagem) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="GERENCIAR HOSPEDES" />
                <TabelaHospedes exibirHospede={setHospede}
                    dadosHospedes={listaHospedes}
                    editarHospedes={prepararAtualizacao}
                    apagarHospedes={prepararRemocao}
                    dadosCPF={setBuscaCPF}
                    escolheBusca={setBusca} />
            </div>
        );
    }

    else if (hospede === HOSPEDE.cadastro) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="CADASTRAR HOSPEDES" />
                <FormCADHospede exibirHospede={setHospede} />
            </div>
        );
    }

    else if (hospede === HOSPEDE.atualizar) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR HOSPEDES" />
                <FormATUHospede exibirHospede={setHospede} listaHospede={atualizaHospede} />
            </div>
        );
    }
}