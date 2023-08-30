'use client'
import { Container } from "react-bootstrap";

export default function NaoPermitido() {

    function voltarPagina() {
        window.history.back()
    }

    return (
        <Container className="d-flex mt-4 mb-4 p-5 justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <h3 className="px-3">Acesso não permitido!</h3>
            <button type="button" className="btn btn-secondary btn-sm" onClick={voltarPagina}>Voltar</button>
        </Container>
    );
}