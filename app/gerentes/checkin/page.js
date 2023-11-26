"use client"
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import Menu from "@/app/componentes/templates/Menu.js";
import { useEffect, useState } from "react";
import TabelaCheckin from "@/app/componentes/tabelas/TabelaCheckin.js";
import CHECKIN from "@/app/componentes/estados/useCheckin.js";
import ipBackend from "@/app/componentes/IPBackend.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado";
import RelatorioCheckin from "@/app/componentes/tabelas/RelatorioCheckin";

export default function TelaCadCheckin() {

    const [reservas, setReservas] = useState([]);
    const [baixarReserva, setBaixarReserva] = useState(CHECKIN.busca);
    const [relatorio, setRelatorio] = useState([]);

    useEffect(() => {
        fetch(ipBackend + 'reserva', {
            method: "GET"
        }).then((resposta) => {
            return resposta.json()
        }).then((dados) => {
            setReservas(dados)
        }).catch((erro) => {
            alertaErro(erro);
        });
    });

    function buscarRelatorio(periodo) {
        fetch(ipBackend + "reserva/periodo", {
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

    if (baixarReserva === CHECKIN.busca) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="LISTA DE RESERVAS" />
                <TabelaCheckin dadosCheckin={reservas}
                    execBaixa={setBaixarReserva}/>
                <RodapeLogado />
            </div>
        )
    }

    else if (baixarReserva === CHECKIN.buscaCOD) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="RELATÓRIO DE RESERVAS" />
                    <RelatorioCheckin execBaixa={setBaixarReserva}
                                      dadosRelatorio={relatorio} 
                                      pesquisar={buscarRelatorio}/>
                <RodapeLogado />
            </div>
        );
    }

    
}