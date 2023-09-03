'use client'
export default function RodapeLogado() {

    function apagarCookie() {
        if (document.cookie === "hotelLegal=authGerente") {
            document.cookie = "hotelLegal=authGerente; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href="/"
        }
        else if (document.cookie === "hotelLegal=authAuxiliar") {
            document.cookie = "hotelLegal=authAuxiliar; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href="/"
        }
        else if (document.cookie === "hotelLegal=authHospede") {
            document.cookie = "hotelLegal=authHospede; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href="/"
        }
        else if (document.cookie === "hotelLegal=authAtendente") {
            document.cookie = "hotelLegal=authAtendente; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href="/"
        }
    }

    return (
        <footer className="bg-secondary p-1 d-flex fixarRodapeLogado">
            <div className="d-flex justify-content-start tamanhoUser pt-1">
                <h6 className="letraRodape">Usuário: </h6>
            </div>
            <div className="d-flex justify-content-end tamanhoSair">
                <button type="button" className="btn btn-danger btn-sm" onClick={apagarCookie}>Sair</button>
            </div>
        </footer>
    )
}