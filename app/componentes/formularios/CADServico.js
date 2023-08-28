import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import SERVICO from '../estados/useServico.js';
import ipBackend from '../IPBackend.js';
import MODOBUCASERV from '../estados/useModoBuscaServico.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormCADServico(props) {

    function cadastrarServico(servico) {
        fetch(ipBackend + "servico", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(servico)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    const [formValidado, setFormValidado] = useState(false);
    const nome_serv = useRef("");
    const descricao_serv = useRef("");
    const valor = useRef("");

    function validarDados() {
        const servico = {
            nome_serv: nome_serv.current.value,
            descricao_serv: descricao_serv.current.value,
            valor: valor.current.value,
        }
        if (servico.nome_serv && servico.descricao_serv && servico.valor) {
            return servico;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novoservico = validarDados();
            if (novoservico) {
                cadastrarServico(novoservico);
                props.exibirServico(SERVICO.listarServico);
                props.escolheBusca(MODOBUCASERV.servico);

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
                            <Form.Label>Nome do Serviço</Form.Label>
                            <Form.Control
                                id="nome_serv"
                                name="nome_serv"
                                required
                                type="text"
                                ref={nome_serv}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do serviço
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="descricao_serv"
                                    name="descricao_serv"
                                    type="text"
                                    required
                                    ref={descricao_serv}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a descrição
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                id="valor"
                                name="valor"
                                type="text"
                                ref={valor}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o valor
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Cadastrar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirServico(SERVICO.listarServico) }}>Voltar</Button>
            </Form>
        </Container>
    )
}