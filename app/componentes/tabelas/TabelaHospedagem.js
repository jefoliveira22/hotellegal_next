import { Container, Card, Button, Col, Row, Navbar, Nav } from "react-bootstrap";
import HOSPEDAGEM from "../estados/useHospedagem";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from "react";

export default function TabelaHospedagem(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function enviaCheckout(chekout) {
        props.dadosCheckout(chekout);
        props.mudaCheckout(HOSPEDAGEM.checkout);
    }

    const listaHospedagem = props.dados

    if (listaHospedagem.length) {
        return (
            <Container>

                <Navbar>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 align-items-end" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                        <Button variant="outline-success" className="mt-3 me-2" onClick={() => { props.mudaCheckout(HOSPEDAGEM.consultas) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg> Relatórios</Button>
                        <Button variant="outline-info" className='mt-3' onClick={handleShow}>Help</Button>
                        <Offcanvas show={show} onHide={handleClose} placement='bottom'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Lista de Hospedagens</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                - Esta tela oferece uma listagem de hospedagens ativas, ou seja, onde o cliente está hospedado. <br />
                                - Ao clicar em "Check-out", é exibido um resumo da hospedagem, contendo alguns dados do hospede, valores da hospedagem, consumo e serviços e o pagamento. <br />
                                - Após conclusão do pagamento, a hospedagem sai desta lista. <br />
                                - O botão "Relatórios" permite localizar hospedagens, selecionando um período ou hospede específico.
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Navbar.Collapse>
                </Navbar>
                <Container className="mt-3 mb-4 d-flex justify-content-center">
                    {listaHospedagem.map((hospedagem) => {
                        let dataini = new Date(hospedagem.data_ini)
                        let datafim = new Date(hospedagem.reserva.checkout);
                        const tot_ocupantes = hospedagem.reserva.qte_pessoa_mais + hospedagem.reserva.qte_pessoa_menos + 1;
                        return (
                            <Card
                                bg={"Secondary".toLowerCase()}
                                key={hospedagem.id_hospedagem}
                                text={"Secondary".toLowerCase() === 'light' ? 'dark' : 'white'}
                                style={{ width: '18rem' }}
                                className="mb-2 me-3">
                                <Card.Header>ID: {hospedagem.id_hospedagem} </Card.Header>
                                <Card.Body>
                                    <Card.Title><h5>CPF: {hospedagem.reserva.hospede.cpf}</h5></Card.Title>
                                    <Row>
                                        <h6>Acomodação: {hospedagem.reserva.acomodacao}</h6>
                                    </Row>
                                    <Row>
                                        <h6>Ocupantes: {tot_ocupantes}</h6>
                                    </Row>
                                    <Row>
                                        <h6>Data de Entrada: {dataini.toLocaleDateString()}</h6>
                                    </Row>
                                    <Row>
                                        <h6>Data de Saida: {datafim.toLocaleDateString()}</h6>
                                    </Row>
                                    <Col className="mt-2 d-flex justify-content-center">
                                        <Button variant="outline-warning" onClick={() => { enviaCheckout(hospedagem) }} >Check-out</Button>
                                    </Col>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Container>
            </Container>
        );
    }

    else {
        return (
            <Container>
                <Navbar>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                        <Button variant="outline-success" className="mt-3 me-2" onClick={() => { props.mudaCheckout(HOSPEDAGEM.consultas) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg> Relatórios</Button>
                        <Button variant="outline-info" className='mt-3' onClick={handleShow}>Help</Button>
                        <Offcanvas show={show} onHide={handleClose} placement='bottom'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Lista de Hospedagens</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                - Esta tela oferece uma listagem de hospedagens ativas, ou seja, onde o cliente está hospedado. <br />
                                - Ao clicar em Check-out, é exibido um resumo da hospedagem, contendo alguns dados do hospede, valores da hospedagem, consumo e serviços e o pagamento. <br />
                                - Após conclusão do pagamento, a hospedagem sai desta lista. <br />
                                - O botão relatórios permite localizar hospedagens, selecionando um período ou hospede específico.
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Navbar.Collapse>
                </Navbar>
                <Container className="mt-4 mb-4 d-flex justify-content-center">
                    <h3>Ops... O Hotel parece estar vazio!</h3>
                </Container>
            </Container>
        )
    }
}