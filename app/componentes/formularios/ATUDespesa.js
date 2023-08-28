import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import DESPESA from '../estados/useDespesa.js';
import ipBackend from '../IPBackend.js';
import confirmaAtualização from '../alertas/Atualizacao.js';
import alertaErro from '../alertas/Erro.js';


export default function FormATUDespesa(props) {

    const idDespesa = props.listaDespesas.id_despesa

    function cadastrarDespesa(despesa) {
        fetch(ipBackend + "despesa", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(despesa)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }
    
    useEffect(() => {
        if (props.listaDespesas) {
            cod_tipo_despesa.current.value = props.listaDespesas.cod_tipo_despesa
            nome_desp.current.value = props.listaDespesas.nome_desp
            nfe.current.value = props.listaDespesas.nfe
            fornecedor.current.value = props.listaDespesas.fornecedor
            data_comp.current.value = props.listaDespesas.data_comp
            valortotal.current.value = props.listaDespesas.valortotal
            obs.current.value = props.listaDespesas.obs
            pago.current.value = props.listaDespesas.pago
        }
    },[])

    const [formValidado, setFormValidado] = useState(false);
    const cod_tipo_despesa = useRef("");
    const nome_desp = useRef("");
    const nfe = useRef("");
    const fornecedor = useRef("");
    const data_comp = useRef("");
    const valortotal = useRef("");
    const obs = useRef("");
    const pago = useRef("");

    function validarDados() {
        const despesa = {
            id_despesa: idDespesa,
            cod_tipo_despesa: cod_tipo_despesa.current.value,
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
                                <Form.Label>Código da despesa</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        id="cod_tipo_despesa"
                                        name="cod_tipo_despesa"
                                        type="text"
                                        ref={cod_tipo_despesa}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Informe o código da despesa
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nome da despesa</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        id="nome_desp"
                                        name="nome_desp"
                                        type="text"
                                        ref={nome_desp}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Informe o nome da despesa
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
                                checked='Sim'
                                ref={pago} />
                        </Form.Group>
                    </Row>
                    <Button type="submit" variant='outline-primary' className='mt-3 me-2'>Cadastrar</Button>
                    <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirDespesa(DESPESA.listagem) }}>Voltar</Button>
                </Form>
            </Row>
        </Container>
    );
}