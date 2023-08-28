import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Form, Col, Accordion, ListGroup } from 'react-bootstrap';
import ipBackend from '../IPBackend.js';
import alertaErro from '../alertas/Erro.js';
import confirmaAtualização from '../alertas/Atualizacao.js';


export default function FormCheckout(props) {

    const [dadosConsumo, setDadosConsumo] = useState([]);
    const [dadosServico, setDadosServico] = useState([]);

    useEffect(() => {
        const id = props.dadosCheckout.id_hospedagem;
        const dado = id.toString();
        fetch(ipBackend + 'consumo/id/' + dado, { method: "GET" })
            .then((resposta) => {
                return resposta.json()
            })
            .then((dados) => {
                setDadosConsumo(dados);
            }).catch((erro) => {
                alertaErro(erro);
            });

        fetch(ipBackend + 'consumoserv/id/' + dado, { method: "GET" })
            .then((resposta) => {
                return resposta.json()
            })
            .then((dados) => {
                setDadosServico(dados);
            }).catch((erro) => {
                alertaErro(erro);
            });
    });

    const hospedagem = props.dadosCheckout;
    let dataini = new Date(hospedagem.data_ini);
    let datafim = new Date(hospedagem.reserva.checkout);

    function calculaHospedagem() {
        const diferenca = Math.abs(dataini - datafim) / 1000.0;
        const diferencaEmDias = diferenca / 86400;

        const valorhosp = diferencaEmDias * 150.00;
        return valorhosp;
    }

    function calculaServico() {
        let servico_total = 0;
        for (const servico of dadosServico) {
            servico_total += parseFloat(servico?.valor_serv)
        }
        return servico_total;
    }

    function calculaConsumo() {
        let consumo_total = 0;
        for (const consumo of dadosConsumo) {
            consumo_total += parseFloat(consumo?.valor);
        }
        return consumo_total;
    }

    function calculaTotal() {
        const totalhosp = calculaServico() + calculaConsumo() + calculaHospedagem();
        return totalhosp;
    }

    function encerrarHospedagem() {
        const valorfinal = calculaTotal().toFixed(2);
        fetch(ipBackend + "hospedagem", {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_hospedagem: hospedagem.id_hospedagem,
                data_ini: dataini.toISOString().split('T')[0],
                data_fim: datafim.toISOString().split('T')[0],
                valor_tot: valorfinal,
                h_ativo: "Não",
                reserva: {
                    id_reserva: hospedagem.reserva.id_reserva
                },
            })
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
        props.voltar(true)
    };

    return (
        <Container className='mt-3 d-flex justify-content-center'>
            <Col md={5}>
                <Card>
                    <Card.Header><h6>RESUMO</h6></Card.Header>
                    <Card.Body>
                        <Accordion defaultActiveKey={['1']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header ><h6>DADOS DA HOSPEDAGEM</h6></Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <strong>Hospede CPF:</strong> {hospedagem.reserva.hospede.cpf}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Hospede Nome:</strong> {hospedagem.reserva.hospede.nome}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Código da Hospedagem:</strong> {hospedagem.id_hospedagem}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Quarto:</strong> {hospedagem.reserva.acomodacao}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Data do Check-in:</strong> {dataini.toLocaleDateString()}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Data do Check-out:</strong> {datafim.toLocaleDateString()}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><h6>CUSTOS</h6></Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <strong>Serviços:</strong> R$ {calculaServico().toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Consumos:</strong> R$ {calculaConsumo().toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Hospedagem:</strong> R$ {calculaHospedagem().toFixed(2)}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Total:</strong> R$ {calculaTotal().toFixed(2)}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className='ms-3'>
                    <Card.Header><h6>FORMAS DE PAGAMENTO</h6></Card.Header>
                    <Card.Body>
                        <Container>
                            <Card.Title className='text-center'>OPÇÕES DISPONÍVEIS</Card.Title>
                            <hr />
                            <Card.Text>
                                <Form>
                                    <Row>
                                        <Form.Check
                                            inline
                                            label="Pagamento á vista"
                                            name="pagamento"
                                            type="radio"
                                            id="pagamento" />
                                    </Row>
                                    <Row>
                                        <Form.Check
                                            inline
                                            label="Cartão de crédito e debito"
                                            name="pagamento"
                                            type="radio"
                                            id="pagamento" />
                                    </Row>
                                    <Row>
                                        <Form.Check
                                            inline
                                            label="Pagamento via pix"
                                            type="radio"
                                            name="pagamento"
                                            id="pagamento" />
                                    </Row>
                                    <hr />
                                    <Row className='text-center'>
                                        <Button className='me-2' variant="outline-success" onClick={encerrarHospedagem}>Pagar</Button>
                                        <Button variant='outline-secondary' className='mt-2' onClick={() => { props.voltar(true) }} >Voltar</Button>
                                    </Row>
                                </Form>
                            </Card.Text>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Container >
    );
}