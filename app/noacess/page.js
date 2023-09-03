'use client'
import Cabecalho from "../componentes/templates/Cabecalho.js";
import NaoPermitido from "../componentes/templates/Noacess.js";

export default function ErroPagina() {
    return(
        <main>
            <Cabecalho />
            <NaoPermitido />
        </main>
    )
}