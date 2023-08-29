export default function RodapeLogado(props) {

    function apagarCookie() {
        document.cookie = "authGerente ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    }

    return (
        <footer className="bg-secondary d-flex p-1 fixarRodapeLogado">
            <div className="d-flex">
                <h6>Usuário: Jubileu</h6>
            </div>
            <div className="d-flex">
                <a onClick={apagarCookie} href="/"><h6>Sair</h6></a>
            </div>
        </footer>
    )
}