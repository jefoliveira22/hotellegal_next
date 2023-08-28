import { Container, Button } from "react-bootstrap";
import { Form, Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import { useRef } from "react";
import CHECKIN from "../estados/useCheckin.js";
import ipBackend from "../IPBackend.js";
import confirmaAtualização from "../alertas/Atualizacao.js";
import confirmaGravação from "../alertas/Gravacao.js";
import alertaErro from "../alertas/Erro.js";

export default function TabelaCheckin(props) {

    const pesquisacheck = useRef("")

    function passaCodigo() {
        const dadoscod = pesquisacheck.current.value
        props.execBaixa(CHECKIN.buscaCOD);
        props.dadosCOD(dadoscod)
    }

    function darBaixa(checkinmap) {
        let dataini = new Date(checkinmap.checkin);
        const dadosBaixa = {
            id_reserva: checkinmap.id_reserva,
            checkin: checkinmap.checkin,
            checkout: checkinmap.checkout,
            qte_pessoa_mais: checkinmap.qte_pessoa_mais,
            qte_pessoa_menos: checkinmap.qte_pessoa_menos,
            acomodacao: checkinmap.acomodacao,
            canc_free: checkinmap.canc_free,
            ativo: "Não",
            hospede: checkinmap.hospede
        };
        const dadosHospedagem = {
            data_ini: dataini.toISOString().split('T')[0],
            valor_tot: "0,00",
            h_ativo: "Sim",
            reserva: checkinmap
        }
        lancarHospedagem(dadosHospedagem);
        props.execBaixa(CHECKIN.atualiza);
        baixarReserva(dadosBaixa);
    }

    function baixarReserva(dados) {
        fetch(ipBackend + "reserva/baixar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
            props.execBaixa(CHECKIN.busca);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function lancarHospedagem(dados) {
        fetch(ipBackend + "hospedagem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    return (
        <Container className='mb-5'>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Busca por Código"
                            className="me-2"
                            aria-label="Search"
                            name="pesquisa"
                            id="pesquisa"
                            ref={pesquisacheck}
                        />
                        <Button variant="outline-dark" onClick={passaCodigo}>Pesquisar</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Container className="mt-4 mb-4 d-flex justify-content-center">
                {props.dadosCheckin.map((reserva) => {
                    let dataini = new Date(reserva.checkin)
                    let datafim = new Date(reserva.checkout)
                    if (reserva.ativo === "Sim") {
                        return (
                            <Card
                                bg={"Secondary".toLowerCase()}
                                key={reserva.id_reserva}
                                text={"Secondary".toLowerCase() === 'light' ? 'dark' : 'white'}
                                style={{ width: '24rem' }}
                                className="mb-2 me-3">
                                <Card.Header>ID: {reserva.id_reserva}</Card.Header>
                                <Card.Body>
                                    <Card.Title> <b>Dados do hospede</b> </Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <h7><b>CPF:</b> {reserva.hospede.cpf}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Nome:</b> {reserva.hospede.nome}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Telefone:</b> {reserva.hospede.telefone}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Endereço:</b> {reserva.hospede.endereco}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Cidade:</b> {reserva.hospede.cidade}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>E-mail:</b> {reserva.hospede.email}</h7>
                                        </Row>
                                    </Card.Text>
                                    <Card.Title> <b>Dados da Reserva</b>  </Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <h7><b>Acomodação:</b> {reserva.acomodacao}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Data de Entrada:</b> {dataini.toLocaleDateString()}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Data de Saida:</b> {datafim.toLocaleDateString()}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Acompanhantes:</b> {reserva.qte_pessoa_mais}</h7>
                                        </Row>
                                        <Col className="mt-2 d-flex justify-content-center">
                                            <Button variant="outline-light" onClick={() => { darBaixa(reserva) }}>Check-in</Button>
                                        </Col>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    }
                    else {
                        return (
                            <div></div>
                        )
                    }
                })}
            </Container>
        </Container>
    );

}