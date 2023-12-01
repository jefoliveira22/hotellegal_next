'use client'
import { useCookies } from 'react-cookie';

export default function RodapeLogado() {

    const [cookies] = useCookies(['hotelLegal']);

    function apagarCookie() {
        let sessao = cookies['hotelLegal']
        if (sessao === "authGerente") {
            document.cookie = "hotelLegal=authGerente; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/"
        }
        else if (sessao === "authAuxiliar") {
            document.cookie = "hotelLegal=authAuxiliar; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/"
        }
        else if (sessao === "authHospede") {
            document.cookie = "hotelLegal=authHospede; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/"
        }
        else if (sessao === "authAtendente") {
            document.cookie = "hotelLegal=authAtendente; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/"
        }
    }

    const usuario = localStorage.getItem('username')

    return (
        <footer className="bg-secondary p-1 d-flex fixarRodapeLogado">
            <div className="d-flex justify-content-start tamanhoUser pt-1" id="teste1">
                <h6 className="letraRodape">Usuário: {usuario}</h6>
            </div>
            <div className="d-flex justify-content-end tamanhoSair" id="teste2">
                <button type="button" className="btn btn-danger btn-sm" onClick={apagarCookie}>Sair</button>
            </div>
        </footer>
    )
}