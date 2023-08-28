import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import CONSUMO from '../estados/useConsumo.js';
import ipBackend from '../IPBackend.js';
import BarraBusca from '../buscas/Barrabusca.js';
import CaixaSelecao from '../buscas/CaixaSelecao.js';
import TabelaItensConsumo from '../tabelas/TabelaItensConsumo.js';
import MODOBUSCACONS from '../estados/useModoBuscaConsumo.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormCADConsumo(props) {

    const [formValidado, setFormValidado] = useState(false);
    const [dadosHospedagem, setDadosHospedagem] = useState([]);
    const [hospedagemSelecionada, setHospedagemSelecionada] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [qtdItem, setqtdItem] = useState(0);
    const [subTotalCalculado, setSubTotalCalculado] = useState(0.00);
    const [totalConsumo, setTotalConsumo] = useState(0.00);
    const [itensVenda, setItensVenda] = useState({
        id_hospedagem: 0,
        data_cons: "",
        desconto: 0,
        valor: 0,
        listaProdutos: []
    });

    useEffect(() => {
        let listaHospedagem = [];
        fetch(ipBackend + 'hospedagem', { method: "GET" })
            .then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                dados.map((linha) => {
                    if (linha.h_ativo === "Sim") {
                        const dado = {
                            id_hospedagem: linha.id_hospedagem,
                            id_reserva: linha.reserva.id_reserva,
                            cpf: linha.reserva.hospede.cpf,
                            nome: linha.reserva.hospede.nome,
                            acomodacao: linha.reserva.acomodacao
                        }
                        listaHospedagem.push(dado);
                    }
                })
                setDadosHospedagem(listaHospedagem)
            });
    }, []);

    function cadastrarConsumo() {
        fetch(ipBackend + "consumo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_hospedagem: hospedagemSelecionada.id_hospedagem,
                data_cons: data_cons.current.value,
                desconto: desconto.current.value,
                valor: totalConsumo,
                listaProdutos: itensVenda.listaProdutos
            })
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    const data_cons = useRef("");
    const desconto = useRef("");


    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            cadastrarConsumo();
            props.exibirConsumo(CONSUMO.listagem);
            props.escolheBusca(MODOBUSCACONS.consumo);
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
                            <Form.Label>Hospede</Form.Label>
                            <InputGroup hasValidation>
                                <BarraBusca placeHolder={'Busque pelo nome do hospede'}
                                    dados={dadosHospedagem}
                                    campoChave={"id_hospedagem"}
                                    campoBusca={"nome"}
                                    funcaoSelecao={setHospedagemSelecionada}
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
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                id="data_cons"
                                name="data_cons"
                                required
                                type="date"
                                ref={data_cons}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe a data
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Desconto</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='deconto'
                                    name='desconto'
                                    type="text"
                                    required
                                    ref={desconto}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o desconto.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Valor Total</Form.Label>
                            <Form.Control
                                type="number"
                                value={totalConsumo.toFixed(2)}
                                disabled
                                required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-5 text-start'>
                    <hr></hr>
                    <Col md={3}>
                        <Form.Label>Selecione o Produto :</Form.Label>
                    </Col>
                    <Col md={9}>
                        <InputGroup hasValidation>
                            <CaixaSelecao
                                enderecoFonteDados="http://localhost:4000/produto"
                                campoChave="id_prod"
                                campoExibicao="nome_prod"
                                funcaoSelecao={setProdutoSelecionado}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Selecione um produto
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='mt-1 text-start'>
                    <Col md={12}>
                        <Row>
                            <Col md={1}>
                                <Form.Group>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type="text"
                                        value={produtoSelecionado?.id_prod}
                                        disabled />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control type="text"
                                        value={produtoSelecionado?.descricao}
                                        disabled />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Preço R$</Form.Label>
                                    <Form.Control type="number"
                                        value={produtoSelecionado?.preco}
                                        disabled />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Quantidade</Form.Label>
                                    <Form.Control type="number"
                                        min={0} value={qtdItem}
                                        onChange={(e) => {
                                            const qtd = parseInt(e.currentTarget.value);
                                            if (qtd > 0) {
                                                setqtdItem(qtd);
                                                setSubTotalCalculado(qtd * parseFloat(produtoSelecionado.preco));
                                            }
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Subtotal R$</Form.Label>
                                    <Form.Control type="number"
                                        value={subTotalCalculado.toFixed(2)}
                                        disabled />
                                </Form.Group>
                            </Col>
                            <Col md={1} className='text-center align-itens-center'>
                                <Form.Label>Add Item</Form.Label>
                                <Button variant="outline-primary" onClick={() => {
                                    let listaItensVendidos = itensVenda.listaProdutos;
                                    listaItensVendidos.push({
                                        id_prod: produtoSelecionado.id_prod,
                                        descricao: produtoSelecionado.descricao,
                                        preco: produtoSelecionado.preco,
                                        qtde: qtdItem,
                                        subtotal: subTotalCalculado
                                    });
                                    setItensVenda({ ...itensVenda, listaProdutos: listaItensVendidos });
                                    setTotalConsumo(totalConsumo + subTotalCalculado);
                                    setqtdItem(0);
                                    setSubTotalCalculado(0.00);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mt-3 text-center'>
                    <hr></hr>
                    <h5><strong>PRODUTOS SELECIONADOS</strong></h5>
                    <hr></hr>
                    <TabelaItensConsumo className='mt-4'
                        listaItens={itensVenda.listaProdutos}
                        setItens={setItensVenda}
                        dadosItens={itensVenda} />
                    <hr></hr>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Registrar Consumo</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirConsumo(CONSUMO.listagem) }}>Voltar</Button>
            </Form>
        </Container>
    )
}