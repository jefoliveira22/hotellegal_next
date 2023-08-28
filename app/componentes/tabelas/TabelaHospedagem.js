import { Container, Card, Button, Col, Row } from "react-bootstrap";

export default function TabelaHospedagem(props) {
    function enviaCheckout(chekout) {
        props.dadosCheckout(chekout);
        props.mudaCheckout(false);
    }

    return (
        <Container className="mt-4 mb-4 d-flex justify-content-center">
            {props.dados.map((hospedagem) => {
                let dataini = new Date(hospedagem.data_ini)
                let datafim = new Date(hospedagem.reserva.checkout);
                const tot_ocupantes = hospedagem.reserva.qte_pessoa_mais + hospedagem.reserva.qte_pessoa_menos + 1;
                if (hospedagem.h_ativo === "Sim") {
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
                }
                else {
                    return (
                        <div></div>
                    )
                }
            })}
        </Container>
    );
}