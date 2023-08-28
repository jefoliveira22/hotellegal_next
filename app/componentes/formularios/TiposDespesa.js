import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import DESPESA from '../estados/useDespesa.js';
import ipBackend from '../IPBackend.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormTDespesa(props) {

    function cadastrarTDespesa(tdespesa) {
        fetch(ipBackend + "tdespesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tdespesa)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    const [formValidado, setFormValidado] = useState(false);
    const cod_tipo_desp = useRef("");
    const descr = useRef("");

    function validarDados() {
        const tdespesa = {
            cod_tipo_desp: cod_tipo_desp.current.value,
            descr: descr.current.value,
        }
        if (tdespesa.cod_tipo_desp && tdespesa.descr) {
            return tdespesa;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novatdespesa = validarDados();
            if (novatdespesa) {
                cadastrarTDespesa(novatdespesa);
                props.exibirDespesa(DESPESA.listatipodespesa);
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
                                <Form.Label>Código</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        id="cod_tipo_desp"
                                        name="cod_tipo_desp"
                                        type="text"
                                        ref={cod_tipo_desp}
                                        required/>
                                    <Form.Control.Feedback type="invalid">
                                        Informe o código do tipo despesa.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        id="descr"
                                        name="descr"
                                        type="text"
                                        ref={descr}
                                        required/>
                                    <Form.Control.Feedback type="invalid">
                                        Informe a descrição do tipo despesa.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" variant='outline-primary' className='mt-3 me-2'>Cadastrar</Button>
                    <Button variant="outline-secondary" className="mt-3" onClick={() => { props.exibirDespesa(DESPESA.listagem) }}>Voltar</Button>
                </Form>
            </Row>
        </Container>
    );
}