"use client"
import Cabecalho from "../componentes/templates/Cabecalho.js";
import Menu from "../componentes/templates/Menu.js";
import { useEffect, useState } from "react";
import TabelaCheckin from "../componentes/tabelas/TabelaCheckin.js";
import CHECKIN from "../componentes/estados/useCheckin.js";
import ipBackend from "../componentes/IPBackend.js";
import alertaErro from "../componentes/alertas/Erro.js";
import RodapeLogado from "../componentes/templates/RodapeLogado.js";

export default function TelaCadCheckin() {

    const [reservas, setReservas] = useState([]);
    const [baixarReserva, setBaixarReserva] = useState(CHECKIN.busca);
    const [codpesquisa, setCodPesquisa] = useState([]);

    useEffect(() => {
        if (baixarReserva === CHECKIN.busca) {
            fetch(ipBackend + 'reserva', {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setReservas(dados)
                }).catch((erro) => {
                    alertaErro(erro);
                });
        }
        else if (baixarReserva === CHECKIN.buscaCOD) {
            fetch(ipBackend + 'reserva/' + codpesquisa, {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setReservas(dados)
                }).catch((erro) => {
                    alertaErro(erro);
                });
        }
    });

    return (
        <div>
            <Menu />
            <Cabecalho titulopagina="LISTA DE RESERVAS" />
            <TabelaCheckin dadosCheckin={reservas} 
                        execBaixa={setBaixarReserva} 
                        dadosCOD={setCodPesquisa}/>
            <RodapeLogado />
        </div>
    )
}