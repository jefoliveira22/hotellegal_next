import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import QUARTO from '../estados/useQuarto.js';
import ipBackend from '../IPBackend.js';
import confirmaAtualização from '../alertas/Atualizacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormATUQuarto(props) {

    const idQuarto = props.listaQuarto.idquarto

    function atualizarQuarto(quarto) {
        fetch(ipBackend + "quarto", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quarto)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    useEffect(() => {
        if (props.listaQuarto) {
            numquarto.current.value = props.listaQuarto.numquarto
            nomequarto.current.value = props.listaQuarto.nomequarto
            descricao.current.value = props.listaQuarto.descricao
            ocupado.current.value = props.listaQuarto.ocupado
        }
    }, []);

    const [formValidado, setFormValidado] = useState(false);
    const numquarto = useRef("");
    const nomequarto = useRef("");
    const descricao = useRef("");
    const ocupado = useRef("");

    function validarDados() {
        const quarto = {
            idquarto: idQuarto,
            numquarto: numquarto.current.value,
            nomequarto: nomequarto.current.value,
            descricao: descricao.current.value,
            ocupado: ocupado.current.value,
        }
        if (quarto.numquarto && quarto.nomequarto && quarto.descricao && quarto.ocupado) {
            return quarto;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novoquarto = validarDados();
            if (novoquarto) {
                atualizarQuarto(novoquarto);
                props.exibirQuarto(QUARTO.listagem);
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
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                id="nomequarto"
                                name="nomequarto"
                                required
                                type="text"
                                ref={nomequarto}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do quarto
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Nº Quarto</Form.Label>
                            <Form.Control
                                id="numquarto"
                                name="numquarto"
                                required
                                type="number"
                                ref={numquarto}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o número do quarto
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="descricao"
                                    name="descricao"
                                    type="text"
                                    required
                                    ref={descricao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe uma descrição do quarto
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Ocupação</Form.Label>
                            <Form.Control
                                id="ocupado"
                                name="ocupado"
                                type="text"
                                ref={ocupado}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe a ocupação do quarto
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Atualizar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirQuarto(QUARTO.listagem) }}>Voltar</Button>
            </Form>
        </Container>
    )
}