"use client"
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import Menu from "@/app/componentes/templates/Menu.js";
import TabelaHospedagem from "@/app/componentes/tabelas/TabelaHospedagem.js";
import { useEffect, useState } from "react";
import FormCheckout from "@/app/componentes/formularios/Checkout";
import ipBackend from "@/app/componentes/IPBackend.js";
import confirmaAtualização from "@/app/componentes/alertas/Atualizacao.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado.js";
import HOSPEDAGEM from "@/app/componentes/estados/useHospedagem";
import RelatorioHospedagem from "@/app/componentes/tabelas/RelatorioHospedagem";

export default function TelaCadHospdedagem() {

    const [hospedagem, setHospedagem] = useState([]);
    const [estadoHospedagem, setEstadoHospedagem] = useState(HOSPEDAGEM.ativa);
    const [checkout, setCheckout] = useState([]);
    const [relatorio, setRelatorio] = useState([]);

    useEffect(() => {
        fetch(ipBackend + 'hospedagem',
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setHospedagem(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
    })

    function encerrarHospedagem(dadosHosp) {
        fetch(ipBackend + "hospedagem", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosHosp)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
            setEstadoHospedagem(HOSPEDAGEM.ativa);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function buscarRelatorio(periodo) {
        fetch(ipBackend + "hospedagem/periodo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(periodo)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setRelatorio(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    if (estadoHospedagem === HOSPEDAGEM.ativa) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="HOSPEDAGENS" />
                <TabelaHospedagem dados={hospedagem} mudaCheckout={setEstadoHospedagem} dadosCheckout={setCheckout} />
                <RodapeLogado />
            </div>
        )
    }

    else if (estadoHospedagem === HOSPEDAGEM.checkout){
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="PAGAMENTO" />
                <FormCheckout dadosCheckout={checkout} execCheckout={encerrarHospedagem} voltar={setEstadoHospedagem} />
                <RodapeLogado />
            </div>
        );
    }

    else if (estadoHospedagem === HOSPEDAGEM.consultas){
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="RELATÓRIOS DE HOSPEDAGENS"/>
                <RelatorioHospedagem dadosRelatorio={relatorio} pesquisar={buscarRelatorio} mudaTela={setEstadoHospedagem}/>
                <RodapeLogado />
            </div>
        );
    }


} 