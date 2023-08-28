import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import CAMAREIRO from "../estados/useCamareiro.js";

export default function TelaCADATVCamareiro(props) {

    const atualizarATVCamareiro = props.atuATVCamareiros

    useEffect(() => {
        if (props.atuATVCamareiros) {
            cpf_cam.current.value = props.atuATVCamareiros.cpf_cam
            descricao.current.value = props.atuATVCamareiros.descricao
            prioridade.current.value = props.atuATVCamareiros.prioridade
            tempoMedioDuracaoMin.current.value = props.atuATVCamareiros.tempoMedioDuracaoMin
        }
    }, []);

    const [formValidado, setFormValidado] = useState(false);
    const cpf_cam = useRef("");
    const descricao = useRef("");
    const prioridade = useRef("");
    const tempoMedioDuracaoMin = useRef("");

    function validarDados() {
        if (atualizarATVCamareiro) {
            const atvcamareiro = {
                id_atv: props.atuATVCamareiros.id_atv,
                cpf_cam: cpf_cam.current.value,
                descricao: descricao.current.value,
                prioridade: prioridade.current.value,
                tempoMedioDuracaoMin: tempoMedioDuracaoMin.current.value,
            }
            if (atvcamareiro.cpf_cam && atvcamareiro.descricao && atvcamareiro.prioridade && atvcamareiro.tempoMedioDuracaoMin) {
                return atvcamareiro;
            }
            else {
                return undefined;
            }
        }
        else {
            const atvcamareiro = {
                cpf_cam: cpf_cam.current.value,
                descricao: descricao.current.value,
                prioridade: prioridade.current.value,
                tempoMedioDuracaoMin: tempoMedioDuracaoMin.current.value,
            }
            if (atvcamareiro.cpf_cam && atvcamareiro.descricao && atvcamareiro.prioridade && atvcamareiro.tempoMedioDuracaoMin) {
                return atvcamareiro;
            }
            else {
                return undefined;
            }
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novoatvcamareiro = validarDados();
            if (novoatvcamareiro && atualizarATVCamareiro) {
                props.exAtuATV(novoatvcamareiro);
                props.mudaTela(CAMAREIRO.listaatv);
            }
            else {
                props.exCadATV(novoatvcamareiro);
                props.mudaTela(CAMAREIRO.listaatv);
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    return (
        <Container className="mb-3 mt-3 text-center">
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="cpf_cam"
                                    name="cpf_cam"
                                    type="text"
                                    required
                                    ref={cpf_cam}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o CPF.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="descricao"
                                    name="descricao"
                                    type="text"
                                    ref={descricao}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe uma descrição.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Select
                                id="prioridade"
                                name="prioridade"
                                required
                                ref={prioridade}>
                                <option></option>
                                <option value="1">Baixa</option>
                                <option value="2">Média</option>
                                <option value="3">Alta</option>
                                <option value="4">Urgente</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Informe a Prioridade.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Tempo Médio</Form.Label>
                            <Form.Control
                                id="tempoMedioDuracaoMin"
                                name="tempoMedioDuracaoMin"
                                type="time"
                                ref={tempoMedioDuracaoMin}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o tempo médio.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Cadastrar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.mudaTela(CAMAREIRO.listaatv) }}>Voltar</Button>
            </Form>
        </Container>
    )
}