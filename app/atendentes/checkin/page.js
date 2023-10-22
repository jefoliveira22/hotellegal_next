"use client"
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import { useEffect, useState } from "react";
import TabelaCheckin from "@/app/componentes/tabelas/TabelaCheckin.js";
import CHECKIN from "@/app/componentes/estados/useCheckin.js";
import ipBackend from "@/app/componentes/IPBackend.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado";
import MenuAtendente from "@/app/componentes/templates/MenuAtendente";

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
            <MenuAtendente/>
            <Cabecalho titulopagina="LISTA DE RESERVAS" />
            <TabelaCheckin dadosCheckin={reservas} 
                        execBaixa={setBaixarReserva} 
                        dadosCOD={setCodPesquisa}/>
            <RodapeLogado />
        </div>
    )
}