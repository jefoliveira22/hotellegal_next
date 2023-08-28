import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import SERVICO from '../estados/useServico.js';
import ipBackend from '../IPBackend.js';
import BarraBusca from '../buscas/Barrabusca';
import CaixaSelecao from '../buscas/CaixaSelecao.js';
import TabelaItensServico from '../tabelas/TabelaItensServico.js';
import MODOBUCASERV from '../estados/useModoBuscaServico.js';
import confirmaGravação from '../alertas/Gravacao.js';
import alertaErro from '../alertas/Erro.js';

export default function FormServico(props) {

    const [formValidado, setFormValidado] = useState(false);
    const [dadosHospedagem, setDadosHospedagem] = useState([]);
    const [hospedagemSelecionada, setHospedagemSelecionada] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState({});
    const [qtdItem, setqtdItem] = useState(0);
    const [subTotalCalculado, setSubTotalCalculado] = useState(0.00);
    const [totalConsumo, setTotalConsumo] = useState(0.00);
    const [itensVenda, setItensVenda] = useState({
        id_hospedagem: 0,
        data_serv: "",
        desconto_serv: 0,
        valor: 0,
        listaServicos: []
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
            }).catch((erro) => {
                alertaErro(erro);
            });
    }, []);

    function cadastrarConsumo() {
        fetch(ipBackend + "consumoserv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data_serv: data_serv.current.value,
                desconto_serv: desconto_serv.current.value,
                valor_serv: totalConsumo,
                listaServicos: itensVenda.listaServicos,
                hospedagem: {
                    id_hospedagem: hospedagemSelecionada.id_hospedagem
                }
            })
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    const data_serv = useRef("");
    const desconto_serv = useRef("");


    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            cadastrarConsumo();
            props.exibirConsumo(SERVICO.listagem);
            props.escolheBusca(MODOBUCASERV.consumoServ);
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
                                id="data_serv"
                                name="data_serv"
                                required
                                type="date"
                                ref={data_serv}
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
                                    id='desconto_serv'
                                    name='desconto_serv'
                                    type="text"
                                    required
                                    ref={desconto_serv}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o desconto
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
                        <Form.Label>Selecione o Serviço :</Form.Label>
                    </Col>
                    <Col md={9}>
                        <InputGroup hasValidation>
                            <CaixaSelecao
                                enderecoFonteDados="http://localhost:4000/servico"
                                campoChave="id_servico"
                                campoExibicao="nome_serv"
                                funcaoSelecao={setServicoSelecionado}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Selecione um serviço
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
                                        value={servicoSelecionado?.id_servico}
                                        disabled />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control type="text"
                                        value={servicoSelecionado?.descricao_serv}
                                        disabled />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group>
                                    <Form.Label>Preço R$</Form.Label>
                                    <Form.Control type="text"
                                        value={servicoSelecionado?.valor}
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
                                                setSubTotalCalculado(qtd * parseFloat(servicoSelecionado.valor));
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
                                    let listaServicosVendidos = itensVenda.listaServicos;
                                    listaServicosVendidos.push({
                                        id_servico: servicoSelecionado.id_servico,
                                        descricao_serv: servicoSelecionado.descricao_serv,
                                        valor_serv: servicoSelecionado.valor,
                                        qtd_serv: qtdItem,
                                        subtotal: subTotalCalculado
                                    });
                                    setItensVenda({ ...itensVenda, listaServicos: listaServicosVendidos });
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
                    <h5><strong>SERVIÇOS SELECIONADOS</strong></h5>
                    <hr></hr>
                    <TabelaItensServico className='mt-4'
                        listaItens={itensVenda.listaServicos}
                        setItens={setItensVenda}
                        dadosItens={itensVenda} />
                    <hr></hr>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Registrar Serviço</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirServico(SERVICO.listagem) }}>Voltar</Button>
            </Form>
        </Container>
    );
}