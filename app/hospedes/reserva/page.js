"use client"
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import MenuHospede from "@/app/componentes/templates/MenuHospede.js";
import FormREVHospede from "@/app/componentes/formularios/REVHospede.js";
import { useState } from "react";
import FormReserva from "@/app/componentes/formularios/Reserva.js";
import ComprovanteReserva from "@/app/componentes/formularios/Comprovante.js";
import RESERVA from "@/app/componentes/estados/useReserva.js";
import ipBackend from "@/app/componentes/IPBackend.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado.js";

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
                <MenuHospede />
                <Cabecalho titulopagina="RESERVAR QUARTO"/>
                    <FormREVHospede subtitulo="Informe os dados abaixo" botao="Avançar" exibirReserva={setReserva}/>
                <RodapeLogado />
            </div>
        );
        
    }
    else if (reserva === RESERVA.reserva) {
        return (
            <div>
                <MenuHospede />
                <Cabecalho titulopagina="RESERVAR QUARTO"/>
                    <FormReserva exibirReserva={setReserva} 
                                 subtitulo="Segundo passo - Escolha sua reserva."/>
                <RodapeLogado />
            </div>
            );
    }

    else if (reserva === RESERVA.cupom) {
        
        consultarUltimoReg();

        return (
            <div>
                <MenuHospede />
                <Cabecalho titulopagina="RESERVAR QUARTO"/>
                    <ComprovanteReserva exibirReserva={setReserva} dados={listaReservas}/>
                <RodapeLogado />
            </div>
        );
    }

    
}