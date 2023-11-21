'use client'
import { Container, Button, Navbar, Nav, Form, Table } from "react-bootstrap";
import { useRef } from "react";
import HOSPEDAGEM from "../estados/useHospedagem";

export default function RelatorioHospedagem(props) {

    const inicio = useRef("")
    const fim = useRef("")

    function buscar() {
        const periodo = {
            inicio: inicio.current.value,
            fim: fim.current.value
        }
        props.pesquisar(periodo)
    }

    return (
        <Container className='mb-5'>
            <Navbar expand="lg" className="mt-2 mb-2" id="elementoFiltro">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Button variant="outline-secondary" onClick={() => { props.mudaTela(HOSPEDAGEM.ativa) }} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg> Voltar
                        </Button>
                    </Nav>
                    <Form className="d-flex">
                            <Form.Control
                                type="date"
                                className="me-2"
                                name="inicio"
                                id="inicio"
                                ref={inicio}
                            />
                            <Form.Control
                                type="date"
                                className="me-2"
                                name="fim"
                                id="fim"
                                ref={fim}
                            />
                            <Button variant="outline-dark" onClick={buscar} className="me-2">Pesquisar</Button>
                            <Button variant="outline-primary" onClick={() => {window.print()}}> Imprimir</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID HOSP</th>
                        <th>NOME</th>
                        <th>TELEFONE</th>
                        <th>E-MAIL</th>
                        <th>CIDADE</th>
                        <th>ID RESERVA</th>
                        <th>ENTRADA</th>
                        <th>SAIDA</th>
                        <th>TOTAL</th>
                        <th>ATIVO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.dadosRelatorio.map((item) => {
                            let data_ini = new Date(item.data_ini)
                            let data_fim = new Date(item.data_fim)
                            return (
                                <tr key={item.id_hospedagem}>
                                    <td>{item.id_hospedagem}</td>
                                    <td>{item.reserva.hospede.usuario.nome}</td>
                                    <td>{item.reserva.hospede.usuario.telefone}</td>
                                    <td>{item.reserva.hospede.usuario.email}</td>
                                    <td>{item.reserva.hospede.usuario.cidade}</td>
                                    <td>{item.reserva.id_reserva}</td>
                                    <td>{data_ini.toLocaleDateString()}</td>
                                    <td>{item.data_fim ? data_fim.toLocaleDateString() : ""}</td>
                                    <td>{item.valor_tot}</td>
                                    <td>{item.h_ativo}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );

}