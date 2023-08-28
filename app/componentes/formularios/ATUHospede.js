import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import HOSPEDE from '../estados/useHospede.js';
import ipBackend from '../IPBackend.js';
import confirmaAtualização from '../alertas/Atualizacao.js';
import alertaErro from '../alertas/Erro.js';


export default function FormATUHospede(props) {

    function cadastrarHospede(hospede) {
        fetch(ipBackend + "hospede", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hospede)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    useEffect(() => {
        if (props.listaHospede) {
            nome.current.value = props.listaHospede.nome
            cpf.current.value = props.listaHospede.cpf
            email.current.value = props.listaHospede.email
            telefone.current.value = props.listaHospede.telefone
            datanasc.current.value = props.listaHospede.datanasc
            endereco.current.value = props.listaHospede.endereco
            cidade.current.value = props.listaHospede.cidade
            estado.current.value = props.listaHospede.estado
            cep.current.value = props.listaHospede.cep
            nacionalidade.current.value = props.listaHospede.nacionalidade
            profissao.current.value = props.listaHospede.profissao
            sexo.current.value = props.listaHospede.sexo
        }
    }, []);

    const [formValidado, setFormValidado] = useState(false);
    const nome = useRef("");
    const cpf = useRef("");
    const email = useRef("");
    const telefone = useRef("");
    const datanasc = useRef("");
    const endereco = useRef("");
    const cidade = useRef("");
    const estado = useRef("");
    const cep = useRef("");
    const nacionalidade = useRef("");
    const profissao = useRef("");
    const sexo = useRef("");

    function validarDados() {
        const hospede = {
            nome: nome.current.value,
            cpf: cpf.current.value,
            email: email.current.value,
            telefone: telefone.current.value,
            datanasc: datanasc.current.value,
            endereco: endereco.current.value,
            cidade: cidade.current.value,
            estado: estado.current.value,
            cep: cep.current.value,
            nacionalidade: nacionalidade.current.value,
            profissao: profissao.current.value,
            sexo: sexo.current.value,
        }
        if (hospede.nome && hospede.cpf && hospede.email && hospede.telefone && hospede.cidade
            && hospede.estado && hospede.cep) {
            return hospede;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novohospede = validarDados();
            if (novohospede) {
                cadastrarHospede(novohospede);
                props.exibirHospede(HOSPEDE.listagem);
            }

        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    return (
        <Container className="mb-3 mt-3 text-center">
            <Row className="mt-3 mb-3 p-2">
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className='mt-2 mb-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control
                                    id="nome"
                                    name="nome"
                                    required
                                    type="text"
                                    ref={nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o nome do hospede
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>CPF</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        id="cpf"
                                        name="cpf"
                                        type="text"
                                        required
                                        ref={cpf}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe o CPF.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    id="email"
                                    name="email"
                                    type="text"
                                    ref={email}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o e-mail.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    id="telefone"
                                    name="telefone"
                                    required
                                    type="tel"
                                    ref={telefone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o telefone.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Data Nascimento</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        id="datanasc"
                                        name="datanasc"
                                        type="date"
                                        ref={datanasc}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Informe a data nascimento
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Gênero</Form.Label>
                                <Form.Select
                                    id="sexo"
                                    name="sexo"
                                    required
                                    ref={sexo}>
                                    <option></option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Informe o gênero
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col>
                            <Form.Group>
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    id="endereco"
                                    name="endereco"
                                    type="text"
                                    ref={endereco}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o endereço
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    id="cidade"
                                    name="cidade"
                                    type="text"
                                    ref={cidade}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe a cidade
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    id="estado"
                                    name="estado"
                                    ref={estado}
                                    type="text"
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o estado
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    id="cep"
                                    name="cep"
                                    type="text"
                                    ref={cep}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o CEP.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nacionalidade</Form.Label>
                                <Form.Control
                                    id="nacionalidade"
                                    name="nacionalidade"
                                    type="text"
                                    ref={nacionalidade}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe a nacionalidade.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Profissão</Form.Label>
                                <Form.Control
                                    id="profissao"
                                    name="profissao"
                                    ref={profissao}
                                    type="text"
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe a profissão.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Atualizar</Button>
                    <Button variant="outline-secondary" className='mt-3' onClick={() => { props.exibirHospede(HOSPEDE.listagem) }}>Voltar</Button>
                </Form>
            </Row>

        </Container>
    )
}