import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import CAMAREIRO from "../estados/useCamareiro.js";
import BarraBuscaREV from "../buscas/barrabuscaREV.js";
import ipBackend from "../IPBackend.js";

export default function TelaCADATVCamareiro(props) {

    const atualizarATVCamareiro = props.atuATVCamareiros

    useEffect(() => {
        if (props.atuATVCamareiros) {
            descricao.current.value = props.atuATVCamareiros.descricao
            prioridade.current.value = props.atuATVCamareiros.prioridade
            tempoMedioDuracaoMin.current.value = props.atuATVCamareiros.tempoMedioDuracaoMin
        }
        fetch(ipBackend + 'funcionario',
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                setDadosFuncionarios(dados)
            }).catch((erro) => {
                alertaErro(erro);
            });
    }, []);

    const [formValidado, setFormValidado] = useState(false);
    const [dadosFuncionarios, setDadosFuncionarios] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState([]);
    const descricao = useRef("");
    const prioridade = useRef("");
    const tempoMedioDuracaoMin = useRef("");

    function validarDados() {
        if (atualizarATVCamareiro) {
            const atvcamareiro = {
                id_atv: props.atuATVCamareiros.id_atv,
                nis_cam: funcionarioSelecionado.nis_cam,
                descricao: descricao.current.value,
                prioridade: prioridade.current.value,
                tempoMedioDuracaoMin: tempoMedioDuracaoMin.current.value,
            }
            if (atvcamareiro.nis_cam && atvcamareiro.descricao && atvcamareiro.prioridade && atvcamareiro.tempoMedioDuracaoMin) {
                return atvcamareiro;
            }
            else {
                return undefined;
            }
        }
        else {
            const atvcamareiro = {
                nis_cam: funcionarioSelecionado.nis,
                descricao: descricao.current.value,
                prioridade: prioridade.current.value,
                tempoMedioDuracaoMin: tempoMedioDuracaoMin.current.value,
            }
            if (atvcamareiro.nis_cam && atvcamareiro.descricao && atvcamareiro.prioridade && atvcamareiro.tempoMedioDuracaoMin) {
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
                <Col md={4}>
                        <Form.Group>
                            <Form.Label>Funcionário Designado</Form.Label>
                            <InputGroup hasValidation>
                                <BarraBuscaREV placeHolder={'Busque pelo nome do funcionário'}
                                    dados={dadosFuncionarios}
                                    campoChave={"nis"}
                                    campoBusca={"nome"}
                                    funcaoSelecao={setFuncionarioSelecionado}
                                    valor={""}
                                    required />
                            </InputGroup>
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do hospede
                            </Form.Control.Feedback>
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
                <Row className='mt-2 mb-2 d-flex justify-content-center'>
                    <Col md={2}>
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
                    <Col md={2}>
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