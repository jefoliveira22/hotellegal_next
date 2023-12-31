'use client'
import React, { useState, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Button, Card, Form } from "react-bootstrap";
import LOGIN from '../estados/useLogin.js';
import alertaErro from '../alertas/Erro.js';
import ipBackend from '../IPBackend.js';
import PERMISSAO from '../estados/usePermissao.js';
import alertaErroLogin from '../alertas/Mensagem.js';
import { Accordion } from 'react-bootstrap';


export default function HomeSection(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const loginFunc = useRef("");
    const senhaFunc = useRef("");
    const loginCli = useRef("");
    const senhaCli = useRef("");

    function validarDadosFuncionario() {
        fetch(ipBackend + 'funcionario/login/' + loginFunc.current.value,
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                if (dados[0].usuario.email === loginFunc.current.value && dados[0].senha === senhaFunc.current.value) {
                    if (dados[0].usuario.tipo_usuario === "gerente") {
                        document.cookie = "hotelLegal=authGerente";
                        localStorage.setItem("username", dados[0].usuario.nome);
                        props.estadoLogin(LOGIN.logado);
                        props.estadoPermissao(PERMISSAO.gerente);
                    }
                    else if (dados[0].usuario.tipo_usuario === "atendente") {
                        document.cookie = "hotelLegal=authAtendente";
                        localStorage.setItem("username", dados[0].usuario.nome);
                        props.estadoLogin(LOGIN.logado);
                        props.estadoPermissao(PERMISSAO.atendente);
                    }
                    else if (dados[0].usuario.tipo_usuario === "auxiliar") {
                        document.cookie = "hotelLegal=authAuxiliar";
                        localStorage.setItem("username", dados[0].usuario.nome);
                        props.estadoLogin(LOGIN.logado);
                        props.estadoPermissao(PERMISSAO.auxiliar);
                    }
                }
                else {
                    props.estadoLogin(LOGIN.deslogado);
                    props.estadoPermissao(PERMISSAO.noaccess);
                    alertaErroLogin();
                }
            }).catch((erro) => {
                alertaErro(erro);
            });
    }

    function validarDadosCliente() {
        fetch(ipBackend + 'cliente/login/' + loginCli.current.value,
            {
                method: "GET"
            }).then((resposta) => {
                return resposta.json()
            }).then((dados) => {
                if (dados[0].usuario.email === loginCli.current.value && dados[0].senha === senhaCli.current.value) {
                    if (dados[0].usuario.tipo_usuario === "hospede") {
                        document.cookie = "hotelLegal=authHospede";
                        localStorage.setItem("username", dados[0].usuario.nome);
                        props.estadoLogin(LOGIN.logado);
                        props.estadoPermissao(PERMISSAO.hospede);
                    }
                }
                else {
                    props.estadoLogin(LOGIN.deslogado);
                    props.estadoPermissao(PERMISSAO.noaccess);
                    alertaErroLogin();
                }
            }).catch((erro) => {
                alertaErro(erro);
            });
    }

    return (
        <Container className='mt-3 mb-3 d-flex align-itens-center'>
            <Container className='mh-100'>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img
                            className="d-block w-auto img-thumbnail"
                            src="https://img.freepik.com/fotos-gratis/jovem-mulher-bonita-em-roupao-bebendo-cafe_171337-12756.jpg?w=900&t=st=1667421374~exp=1667421974~hmac=f18df676f0a61b5044e35063f479ef67d49f7fca960f03e046b648e7f9841363"
                            alt="Slide 1"
                        />
                        <Carousel.Caption>
                            <h3 style={{ "textShadow": "2px 2px 4px #000000" }}>Hotel Galeria</h3>
                            <p style={{ "textShadow": "2px 2px 4px #000000" }}>Viva uma nova experiência.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-auto img-thumbnail"
                            src="https://img.freepik.com/fotos-gratis/camareira-fazendo-cama-no-quarto-de-hotel_171337-12690.jpg?w=900&t=st=1667421254~exp=1667421854~hmac=70ccee1a7e3271f6c9a18515b4367f86461d3d43ee69c82ceef277392e8b4105"
                            alt="Slide 2"
                        />
                        <Carousel.Caption>
                            <h3 style={{ "textShadow": "2px 2px 4px #000000" }}>Atendimento de qualidade.</h3>
                            <p style={{ "textShadow": "2px 2px 4px #000000" }}>Equipe preparada para melhor atender.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-auto img-thumbnail"
                            src="https://img.freepik.com/fotos-gratis/interior-pequeno-do-quarto-de-hotel-com-cama-de-casal-e-banheiro_1262-12489.jpg?w=900&t=st=1667421285~exp=1667421885~hmac=bf9ebeeac4ac9f221b785dbc22bd1875aab1b57f33bd36a3a106fd52c3d69b18"
                            alt="Slide 3"
                        />
                        <Carousel.Caption>
                            <h3 style={{ "textShadow": "2px 2px 4px #000000" }}>Ambiente aconchegante</h3>
                            <p style={{ "textShadow": "2px 2px 4px #000000" }}>Viva uma nova experiência em hoteis.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>
            <Container className='w-50'>
                <Card className="text-center h-100">
                    <Container className="position-absolute top-50 start-50 translate-middle">
                        <Card.Title className="mt-4 mb-1">OPÇÕES DE LOGIN</Card.Title>
                        <Card.Body>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>SOU FUNCIONÁRIO</Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group className="mb-3 d-flex align-items-center">
                                            <Form.Label className="m-auto me-1"><b>Usuário</b></Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="loginFunc"
                                                name="loginFunc"
                                                ref={loginFunc}
                                                placeholder='Informe o e-mail'
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3 d-flex align-items-center">
                                            <Form.Label className="m-auto me-3"><b>Senha</b></Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="senhaFunc"
                                                name="senhaFunc"
                                                ref={senhaFunc}
                                            />
                                        </Form.Group>
                                        <Button onClick={validarDadosFuncionario} className='mt-2 me-2' variant='outline-primary'>Login</Button>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>SOU CLIENTE</Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group className="mb-3 d-flex align-items-center">
                                            <Form.Label className="m-auto me-1"><b>Usuário</b></Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="loginCli"
                                                name="loginCli"
                                                ref={loginCli}
                                                placeholder='Informe o e-mail'
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3 d-flex align-items-center">
                                            <Form.Label className="m-auto me-3"><b>Senha</b></Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="senhaCli"
                                                name="senhaCli"
                                                ref={senhaCli}
                                            />
                                        </Form.Group>
                                        <Button onClick={validarDadosCliente} className='mt-2 me-2' variant='outline-primary'>Login</Button>
                                        <h6 className='mt-3'>NÃO TEM USUÁRIO DE ACESSO?</h6>
                                        <Button onClick={() => {props.estadoLogin(LOGIN.cadastrar)}} variant='outline-success'>Cadastrar</Button>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Container>
                </Card >
            </Container>
        </Container>
    );
}