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

export default function TelaCadHospdedagem() {

    const [hospedagem, setHospedagem] = useState([]);
    const [estadoHospedagem, setEstadoHospedagem] = useState(true);
    const [checkout, setCheckout] = useState([]);

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
    }, [])

    function encerrarHospedagem(dadosHosp) {
        fetch(ipBackend + "hospedagem", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosHosp)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
            setEstadoHospedagem(true);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    if (estadoHospedagem) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="HOSPEDAGENS" />
                <TabelaHospedagem dados={hospedagem} mudaCheckout={setEstadoHospedagem} dadosCheckout={setCheckout} />
                <RodapeLogado />
            </div>
        )
    }
    else {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="PAGAMENTO" />
                <FormCheckout dadosCheckout={checkout} execCheckout={encerrarHospedagem} voltar={setEstadoHospedagem} />
                <RodapeLogado />
            </div>
        );
    }


} 