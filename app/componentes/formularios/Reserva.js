import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import RESERVA from '../estados/useReserva.js';
import ipBackend from '../IPBackend.js';
import CaixaSelecao from '../buscas/CaixaSelecao.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormReserva(props) {

    function cadastrarReserva(reserva) {
        fetch(ipBackend + "reserva", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reserva)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    const [formValidado, setFormValidado] = useState(false);
    const [valorSelecionado, setValorSelecionado] = useState({});

    const cpf = useRef("");
    const checkin = useRef("");
    const checkout = useRef("");
    const qte_pessoa_mais = useRef("");
    const qte_pessoa_menos = useRef("");
    const canc_free = useRef("");

    function validarDados() {
        const reserva = {
            cpf_hosp: cpf.current.value,
            checkin: checkin.current.value,
            checkout: checkout.current.value,
            qte_pessoa_mais: qte_pessoa_mais.current.value,
            qte_pessoa_menos: qte_pessoa_menos.current.value,
            acomodacao: valorSelecionado.nomequarto,
            canc_free: canc_free.current.value,
            ativo: "Sim"
        }
        if (reserva.cpf_hosp && reserva.checkin && reserva.checkout && reserva.qte_pessoa_mais
            && reserva.qte_pessoa_menos && reserva.acomodacao && reserva.canc_free) {
            return reserva;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novareserva = validarDados();
            if (novareserva) {
                cadastrarReserva(novareserva);
                props.exibirReserva(RESERVA.cupom);
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    return (
        <Container className="mb-3 mt-3 text-center">
            <Row className='text-center'>
                <h3>{props.subtitulo}</h3>
            </Row>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="cpf"
                                    name="cpf"
                                    type="text"
                                    required
                                    ref={cpf}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o CPF.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Check-in</Form.Label>
                            <Form.Control
                                id="checkin"
                                name="checkin"
                                type="date"
                                ref={checkin}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe data do check-in.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Check-out</Form.Label>
                            <Form.Control
                                id="checkout"
                                name="checkout"
                                required
                                type="date"
                                ref={checkout} />
                            <Form.Control.Feedback type="invalid">
                                Informe data do check-out.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Acompanhantes</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="qte_pessoa_mais"
                                    name="qte_pessoa_mais"
                                    type="number"
                                    ref={qte_pessoa_mais}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o total de acompanhantes.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Menores de idade</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="qte_pessoa_menos"
                                    name="qte_pessoa_menos"
                                    type="number"
                                    ref={qte_pessoa_menos}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o total de menores de idade.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Quarto</Form.Label>
                            <InputGroup hasValidation>
                                <CaixaSelecao
                                    enderecoFonteDados="http://localhost:4000/quarto/vazio"
                                    campoChave="idquarto"
                                    campoExibicao="nomequarto"
                                    funcaoSelecao={setValorSelecionado}
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Informe a acomodação.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-3'>
                        <Form.Group>
                            <Form.Check
                                type='checkbox'
                                id="canc_free"
                                label="Cancelamento Free"
                                value="Sim"
                                ref={canc_free} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='mt-3 me-2' type="submit" variant='outline-primary'>Reservar</Button>
                <Button className='mt-3' variant='outline-secondary' onClick={() => { props.exibirReserva(RESERVA.hospede) }}>Voltar</Button>
            </Form>
        </Container>
    )
}