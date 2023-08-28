import { Button, Container, Row, Card } from "react-bootstrap";
import RESERVA from "../estados/useReserva.js";

export default function ComprovanteReserva(props) {
    return (
        <Container className="mb-3 mt-3 text-center d-flex justify-content-center">
            {props.dados.map((reservadados) => {
                let data = new Date(reservadados.checkin)
                return (
                    <Row>
                        <Card border="success" style={{ width: '18rem' }}>
                            <Card.Header>Reserva Efetuada!</Card.Header>
                            <Card.Body>
                                <Card.Title>Código da reserva: {reservadados.id_reserva}</Card.Title>
                                <Card.Text>
                                    <Row>
                                        <h7>CPF: {reservadados.hospede.cpf}</h7>
                                    </Row>
                                    <Row>
                                        <h7>Data do check-in: {data.toLocaleDateString()}</h7>
                                    </Row>
                                    <Row>
                                        <h7>Quarto selecionado: {reservadados.acomodacao}</h7>
                                    </Row>
                                    <Button onClick={() => { props.exibirReserva(RESERVA.hospede) }} variant="success" className="mt-3">Concluir</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                );
            })}
        </Container>
    )
};