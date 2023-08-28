import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import DESPESA from '../estados/useDespesa.js';
import ipBackend from '../IPBackend.js';
import BarraBusca from '../buscas/Barrabusca.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormCADDespesa(props) {

    function cadastrarDespesa(dadodespesa) {
        fetch(ipBackend + "despesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadodespesa)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    useEffect (() => {
        fetch(ipBackend + 'tdespesa',
        {
            method: "GET"
        }).then((resposta) => {
            return resposta.json()
        }).then((dados) => {
            setDados(dados)
        }).catch((erro) => {
            alertaErro(erro);
        });
    });

    const [formValidado, setFormValidado] = useState(false);
    const [dados, setDados] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState([]);
    const nome_desp = useRef("");
    const nfe = useRef("");
    const fornecedor = useRef("");
    const data_comp = useRef("");
    const valortotal = useRef("");
    const obs = useRef("");
    const pago = useRef("");

    function validarDados() {
        const despesa = {
            cod_tipo_despesa: clienteSelecionado.cod_tipo_desp,
            nome_desp: nome_desp.current.value,
            nfe: nfe.current.value,
            fornecedor: fornecedor.current.value,
            data_comp: data_comp.current.value,
            valortotal: valortotal.current.value,
            obs: obs.current.value,
            pago: pago.current.value,
        }
        if (despesa.cod_tipo_despesa && despesa.nome_desp && despesa.nfe && despesa.fornecedor && despesa.data_comp
            && despesa.valortotal && despesa.obs) {
            return despesa;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novadespesa = validarDados();
            if (novadespesa) {
                cadastrarDespesa(novadespesa);
                props.exibirDespesa(DESPESA.listagem);
                props.escolheBusca(false);
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    return (
        <Container className="mb-3 mt-3 text-center">
            <Row className="mt-2 p-2">
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className='mt-2 mb-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Tipo da despesa</Form.Label>
                                <InputGroup hasValidation>
                                    <BarraBusca placeHolder={'Selecione o tipo de despesa'}
                                        dados={dados}
                                        campoChave={"cod_tipo_desp"}
                                        campoBusca={"descr"}
                                        funcaoSelecao={setClienteSelecionado}
                                        valor={""}/>
                                </InputGroup>
                                <Form.Control.Feedback type="invalid">
                                        Informe a descrição da nota
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        id="nome_desp"
                                        name="nome_desp"
                                        type="text"
                                        ref={nome_desp}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Informe a descrição da nota
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>NFE</Form.Label>
                                <Form.Control
                                    id="nfe"
                                    name="nfe"
                                    type="text"
                                    ref={nfe}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe uma NFE válida
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Fornecedor</Form.Label>
                                <Form.Control
                                    id="fornecedor"
                                    name="fornecedor"
                                    type="text"
                                    ref={fornecedor}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o fornecedor
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Data Compra</Form.Label>
                                <Form.Control
                                    id="data_comp"
                                    name="data_comp"
                                    type="date"
                                    ref={data_comp}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe uma data válida
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Valor Nota</Form.Label>
                                <Form.Control
                                    id="valortotal"
                                    name="valortotal"
                                    type="text"
                                    ref={valortotal}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o valor total
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Observações</Form.Label>
                                <Form.Control
                                    id="obs"
                                    name="obs"
                                    type="text"
                                    ref={obs}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe uma descrição
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Check className='mt-3'
                                id='pago'
                                name="pago"
                                type='checkbox'
                                label='Despesa paga'
                                value='Sim'
                                ref={pago} />
                        </Form.Group>
                    </Row>
                    <Button type="submit" variant='outline-primary' className='mt-3 me-2'>Cadastrar</Button>
                    <Button variant="outline-secondary" className="mt-3" onClick={() => { props.exibirDespesa(DESPESA.listagem) }}>Voltar</Button>
                </Form>
            </Row>
        </Container>
    );
}