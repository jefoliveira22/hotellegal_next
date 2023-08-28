import { useRef } from "react";
import { Container, Navbar, Form, Button, Table, Nav } from "react-bootstrap";
import CAMAREIRO from "../estados/useCamareiro.js";

export default function TabelaATVCamareiro(props) {

    function passaCPF() {
        const dadoscpf = pesquisa.current.value
        props.modoBusca(false)
        props.cpfBusca(dadoscpf)
    }

    const pesquisa = useRef("")

    return (
        <Container className='mb-5'>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Button variant="outline-success" onClick={() => {props.mudaTela(CAMAREIRO.cadastraatv)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg> Adicionar
                        </Button>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Busca por CPF"
                            className="me-2"
                            aria-label="Search"
                            name="pesquisa"
                            id="pesquisa"
                            ref={pesquisa}
                        />
                        <Button variant="outline-dark" onClick={passaCPF}>Pesquisar</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CPF</th>
                        <th>DESCRIÇÃO</th>
                        <th>PRIORIDADE</th>
                        <th>TEMPO DURAÇÃO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaAtvCamareiros.map((atvcamareiros) => {
                            return (
                                <tr key={atvcamareiros.id_atv}>
                                    <td>{atvcamareiros.id_atv}</td>
                                    <td>{atvcamareiros.cpf_cam}</td>
                                    <td>{atvcamareiros.descricao}</td>
                                    <td>{atvcamareiros.prioridade}</td>
                                    <td>{atvcamareiros.tempoMedioDuracaoMin}</td>
                                    <td>
                                        <Button className="me-2" size="sm" variant="outline-primary" onClick={() => {props.exeAtualizacaoATV(atvcamareiros)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </Button>
                                        <Button className="" size="sm" variant="outline-danger" onClick={() => {props.exeRemocao(atvcamareiros)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Button variant="outline-secondary" onClick={() => { props.mudaTela(CAMAREIRO.home) }} className="mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
                    <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                </svg> Voltar
            </Button>
        </Container>
    );
}