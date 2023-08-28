import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import CONSUMO from '../estados/useConsumo.js';
import ipBackend from '../IPBackend.js';
import confirmaAtualização from '../alertas/Atualizacao.js';
import alertaErro from '../alertas/Erro.js';
export default function FormATUConsumo(props) {

    function cadastrarConsumo(consumo) {
        fetch(ipBackend + "consumo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(consumo)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    useEffect(() => {
        if (props.listaConsumo) {
            id_cons_hospedagem.current.value = props.listaConsumo.id_cons_hospedagem
            nome_produt.current.value = props.listaConsumo.nome_produt
            qtde.current.value = props.listaConsumo.qtde
            valor.current.value = props.listaConsumo.valor
        }
    }, []);

    const [formValidado, setFormValidado] = useState(false);
    const id_cons_hospedagem = useRef("");
    const nome_produt = useRef("");
    const qtde = useRef("");
    const valor = useRef("");

    function validarDados() {
        const consumo = {
            id_consumo: props.listaConsumo.id_consumo,
            id_cons_hospedagem: id_cons_hospedagem.current.value,
            nome_produt: nome_produt.current.value,
            qtde: qtde.current.value,
            valor: valor.current.value,
        }
        if (consumo.id_consumo && consumo.id_cons_hospedagem && consumo.nome_produt && consumo.qtde && consumo.valor) {
            return consumo;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novoconsumo = validarDados();
            if (novoconsumo) {
                cadastrarConsumo(novoconsumo);
                props.exibirConsumo(CONSUMO.listagem);
                props.escolheBusca(false);
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
                            <Form.Label>Nome Produto</Form.Label>
                            <Form.Control
                                id="nome_produt"
                                name="nome_produt"
                                required
                                type="text"
                                ref={nome_produt}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do produto!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>ID da hospedagem</Form.Label>
                            <Form.Control
                                id="id_cons_hospedagem"
                                name="id_cons_hospedagem"
                                required
                                type="text"
                                ref={id_cons_hospedagem}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o ID da hospedagem!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Quantidade</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="qtde"
                                    name="qtde"
                                    type="text"
                                    required
                                    ref={qtde}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a quantidade.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                id="valor"
                                name="valor"
                                type="text"
                                ref={valor}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o Valor.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Atualizar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirConsumo(CONSUMO.listagem) }}>Voltar</Button>
            </Form>
        </Container>
    )
}