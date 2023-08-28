"use client"
import Cabecalho from "../componentes/templates/Cabecalho.js";
import Menu from "../componentes/templates/Menu.js";
import FormREVHospede from "../componentes/formularios/REVHospede.js";
import { useState } from "react";
import FormReserva from "../componentes/formularios/Reserva.js";
import ComprovanteReserva from "../componentes/formularios/Comprovante.js";
import RESERVA from "../componentes/estados/useReserva.js";
import ipBackend from "../componentes/IPBackend.js";
import alertaErro from "../componentes/alertas/Erro.js";

export default function TelaCadReserva() {
    
    const [reserva, setReserva] = useState(RESERVA.hospede);
    const [listaReservas, setlistaReservas] = useState([]);

    function consultarUltimoReg() {
        fetch(ipBackend + 'reserva/ultimo/',
            {method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setlistaReservas(dados);
            }).catch((erro) => {
                alertaErro(erro);
        });
    }

    if (reserva === RESERVA.hospede) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="RESERVAR QUARTO"/>
                    <FormREVHospede subtitulo="Informe os dados abaixo" botao="Avançar" exibirReserva={setReserva}/>
            </div>
        );
        
    }
    else if (reserva === RESERVA.reserva) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="RESERVAR QUARTO"/>
                    <FormReserva exibirReserva={setReserva} 
                                 subtitulo="Segundo passo - Escolha sua reserva."/>
            </div>
            );
    }

    else if (reserva === RESERVA.cupom) {
        
        consultarUltimoReg();

        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="RESERVAR QUARTO"/>
                    <ComprovanteReserva exibirReserva={setReserva} dados={listaReservas}/>
            </div>
        );
    }

    
}