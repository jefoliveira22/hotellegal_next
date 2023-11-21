'use client'
export default function RodapeLogado() {

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /*function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }*/

    function apagarCookie() {
        let sessao = getCookie("hotelLegal")
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

    let cookieNome = getCookie("username")

    return (
        <footer className="bg-secondary p-1 d-flex fixarRodapeLogado">
            <div className="d-flex justify-content-start tamanhoUser pt-1" id="teste1">
                <h6 className="letraRodape">Usuário: {cookieNome}</h6>
            </div>
            <div className="d-flex justify-content-end tamanhoSair" id="teste2">
                <button type="button" className="btn btn-danger btn-sm" onClick={apagarCookie}>Sair</button>
            </div>
        </footer>
    )
}