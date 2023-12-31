import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ipBackend from '../IPBackend.js';
import CaixaSelecao from '../buscas/CaixaSelecao.js';
import BarraBuscaREV from '../buscas/barrabuscaREV.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function FormREVHospede(props) {

    function cadastrarHospede(reserva) {
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

    useEffect(() => {
        fetch(ipBackend + 'cliente',
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setDados(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
    }, []);

    const [formValidado, setFormValidado] = useState(false);
    const [valorSelecionado, setValorSelecionado] = useState({});
    const [dados, setDados] = useState([]);
    const [hospedeSelecionado, setHospedeSelecionado] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkin = useRef("");
    const checkout = useRef("");
    const qte_pessoa_mais = useRef("");
    const qte_pessoa_menos = useRef("");
    const canc_free = useRef("");

    function validarDados() {
        const reserva = {
            checkin: checkin.current.value,
            checkout: checkout.current.value,
            qte_pessoa_mais: qte_pessoa_mais.current.value,
            qte_pessoa_menos: qte_pessoa_menos.current.value,
            acomodacao: valorSelecionado.nomequarto,
            canc_free: canc_free.current.value,
            ativo: "Sim",
            hospede: {
                nome: hospedeSelecionado.usuario.nome,
                cpf: hospedeSelecionado.cpf,
                email: hospedeSelecionado.usuario.email,
                telefone: hospedeSelecionado.usuario.telefone,
                datanasc: hospedeSelecionado.datanasc,
                endereco: hospedeSelecionado.usuario.endereco,
                cidade: hospedeSelecionado.usuario.cidade,
                estado: hospedeSelecionado.usuario.estado,
                cep: hospedeSelecionado.usuario.cep,
                nacionalidade: hospedeSelecionado.nacionalidade,
                profissao: hospedeSelecionado.profissao,
                sexo: hospedeSelecionado.sexo,
            }
        }
        if (reserva.checkin && reserva.checkout && reserva.acomodacao && reserva.canc_free && reserva.hospede) {
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
                cadastrarHospede(novareserva);
                props.geraCupom();
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
            <Row className="mt-3 mb-3 p-2">
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className='mt-2 mb-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Hospede</Form.Label>
                                <InputGroup hasValidation>
                                    <BarraBuscaREV placeHolder={'Selecione o hospede'}
                                        dados={dados}
                                        campoChave={"cpf"}
                                        campoBusca={"nome"}
                                        funcaoSelecao={setHospedeSelecionado}
                                        valor={""}
                                        required />
                                </InputGroup>
                                <Form.Control.Feedback type="invalid">
                                    Informe o CPF do cliente
                                </Form.Control.Feedback>
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
                    <Row className='mt-2 mb-2'>
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
                                        enderecoFonteDados="http://localhost:4000/quarto/vazio/"
                                        campoChave="idquarto"
                                        campoExibicao="nomequarto"
                                        funcaoSelecao={setValorSelecionado}
                                        required />
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
                    <Button type="submit" className='mt-3 me-2' variant='outline-primary'>{"Cadastrar"}</Button>
                    <Button variant="outline-info" className='mt-3' onClick={handleShow}>Help</Button>
                    <Offcanvas show={show} onHide={handleClose} placement='bottom'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Efetuar uma reserva - Preencha os campos para efetuar uma reserva.</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            - Em "Hospede", localize o cadastro do hospede digitando seu nome. <br/>
                            - "Check-in", coloque a data que o hospede entrará no hotel. <br/> 
                            - "Check-out", coloque a data prevista para a saída do hospede. <br/>
                            - "Acompanhantes", coloque pessoas maiores de idade que estão acompanhando o hospede. <br/>
                            - "Menores de idade", coloque pessoas menores de 18 anos. <br/>
                            - "Quarto", selecione o quarto desejado. <br/>
                            - A opção "Cancelamento Free", permite que o hospede cancele a reserva sem custos.
                        </Offcanvas.Body>
                    </Offcanvas>
                </Form>
            </Row>
        </Container>
    )
}