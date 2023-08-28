import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ipBackend from '../IPBackend.js';
import CONSUMO from '../estados/useConsumo.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormCADProduto(props) {

    const atualizarProduto = props.atualizaProduto

    useEffect(() => {
        if (props.atualizaProduto) {
            nome_prod.current.value = props.atualizaProduto.nome_prod
            descricao.current.value = props.atualizaProduto.descricao
            preco.current.value = props.atualizaProduto.preco
        }
    }, []);

    function cadastrarProduto(produto) {
        fetch(ipBackend + "produto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    const [formValidado, setFormValidado] = useState(false);
    const nome_prod = useRef("");
    const descricao = useRef("");
    const preco = useRef("");


    function validarDados() {
        if (atualizarProduto && props.atualizaProduto) {
            const produto = {
                id_prod: props.atualizaProduto.id_prod,
                nome_prod: nome_prod.current.value,
                descricao: descricao.current.value,
                preco: preco.current.value
            }
            if (produto.nome_prod && produto.descricao && produto.preco) {
                return produto;
            }
            else {
                return undefined;
            }
        }
        else {
            const produto = {
                nome_prod: nome_prod.current.value,
                descricao: descricao.current.value,
                preco: preco.current.value
            }
            if (produto.nome_prod && produto.descricao && produto.preco) {
                return produto;
            }
            else {
                return undefined;
            }
        }
        
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novoProduto = validarDados();
            if (novoProduto && props.atualizaProduto) {
                props.exeAtualizaçãoProduto(novoProduto);
                props.exibirConsumo(CONSUMO.listarProduto);
            }
            else {
                cadastrarProduto(novoProduto);
                props.exibirConsumo(CONSUMO.listarProduto);
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
                            <Form.Label>Nome Produto</Form.Label>
                            <Form.Control
                                id="nome_prod"
                                name="nome_prod"
                                required
                                type="text"
                                ref={nome_prod}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do produto
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Preço</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="preco"
                                    name="preco"
                                    type="text"
                                    required
                                    ref={preco}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o preço do produto
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                id="descricao"
                                name="descricao"
                                required
                                type="text"
                                ref={descricao}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe a descrição do produto
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>{props.botaoSubmit || "Cadastrar"}</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirConsumo(CONSUMO.listarProduto) }}>Voltar</Button>
            </Form>
        </Container>
    )
}