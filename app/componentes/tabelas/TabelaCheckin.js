import { Container, Button } from "react-bootstrap";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import CHECKIN from "../estados/useCheckin.js";
import ipBackend from "../IPBackend.js";
import confirmaAtualização from "../alertas/Atualizacao.js";
import confirmaGravação from "../alertas/Gravacao.js";
import alertaErro from "../alertas/Erro.js";
import moment from "moment/moment.js";

export default function TabelaCheckin(props) {

    function darBaixa(checkinmap) {
        const dataAtual = moment().format('YYYY-MM-DD');
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
            data_ini: dataAtual,
            valor_tot: "0,00",
            h_ativo: "Sim",
            reserva: checkinmap,
            acomodacao: checkinmap.acomodacao
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

    const listaReservas = props.dadosCheckin

    if (listaReservas.length) {
        return (
            <Container>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        </Nav>
                        <Button variant="outline-success" className="mt-3" onClick={() => { props.execBaixa(CHECKIN.buscaCOD) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg> Relatórios</Button>
                    </Navbar.Collapse>
                </Navbar>
                <Container className="mt-4 mb-4 d-flex justify-content-center">
                    {props.dadosCheckin.map((reserva) => {
                        let dataini = new Date(reserva.checkin)
                        let datafim = new Date(reserva.checkout)
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
                                            <h7><b>Nome:</b> {reserva.hospede.usuario.nome}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Telefone:</b> {reserva.hospede.usuario.telefone}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Endereço:</b> {reserva.hospede.usuario.endereco}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>Cidade:</b> {reserva.hospede.usuario.cidade}</h7>
                                        </Row>
                                        <Row>
                                            <h7><b>E-mail:</b> {reserva.hospede.usuario.email}</h7>
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
                    })}
                </Container>
            </Container>
        );
    }
    else {
        return (
            <Container>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                        <Button variant="outline-success" className="mt-3" onClick={() => { props.execBaixa(CHECKIN.buscaCOD) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg> Relatórios</Button>
                    </Navbar.Collapse>
                </Navbar>
                <Container className="mt-4 mb-4 d-flex justify-content-center">
                    <h3>Ops... Não temos nenhuma reserva por enquanto!</h3>
                </Container>
            </Container>
        );
    }
}