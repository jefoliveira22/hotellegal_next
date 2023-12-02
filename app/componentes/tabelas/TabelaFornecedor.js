"use client"
import { Container, Table, Button, Dropdown } from "react-bootstrap";
import { Form, Navbar, Nav } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import USUARIOS from "../estados/useUsuarios";
import ipBackend from "../IPBackend";
import FORNECEDORES from "../estados/useFornecedores";
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function TabelaFornecedores(props) {

    const [listaDados, setListaDados] = useState([]);
    const [modoBusca, setModoBusca] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (modoBusca) {
            fetch(ipBackend + 'fornecedor/' + pesquisa.current.value,
                {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setListaDados(dados)
                }).catch((erro) => {
                    alertaErro(erro);
                });
        }
        else {
            fetch(ipBackend + 'fornecedor',
                {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setListaDados(dados)
                }).catch((erro) => {
                    alertaErro(erro);
                });
        }

    })

    function passaCPF() {
        setModoBusca(true);
    }

    const pesquisa = useRef("")


    return (
        <Container className='mb-5'>
            <Navbar expand="lg" className="mt-2 mb-2">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Button variant="outline-success" onClick={() => { props.mudaFornecedor(FORNECEDORES.cadfornecedor) }} className="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg> Adicionar
                        </Button>
                        <Button variant="outline-secondary" onClick={() => { props.mudaTela(USUARIOS.telahome) }} className="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg> Voltar
                        </Button>
                        <Button variant="outline-info" onClick={handleShow}>Help</Button>
                        <Offcanvas show={show} onHide={handleClose} placement='bottom'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Lista de Fornecedores</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                - Esta tela oferece uma listagem dos fornecedores cadastrados no sistema. <br />
                                - O botão "Adicionar", permite adicionar um novo fornecedor ao sistema. <br />
                                - Na listagem, é possível alterar os dados, além de remove-lo, utilizando os botões da coluna "Ações". <br />
                                - O campo de busca permite localizar um fornecedor pelo seu nome.
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Busca por nome"
                            className="me-2"
                            aria-label="Search"
                            name="pesquisa"
                            id="pesquisa"
                            ref={pesquisa}
                        />
                        <Button variant="outline-dark" onClick={passaCPF}>Pesquisar</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>RAZÃO SOCIAL</th>
                        <th>CNPJ</th>
                        <th>IE</th>
                        <th>ENDEREÇO</th>
                        <th>CIDADE</th>
                        <th>UF</th>
                        <th>TELEFONE</th>
                        <th>E-MAIL</th>
                        <th>CATEGORIA</th>
                        <th>AÇOES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDados.map((item) => {
                            return (
                                <tr key={item.usuario.usuario_id}>
                                    <td>{item.usuario.usuario_id}</td>
                                    <td>{item.usuario.nome}</td>
                                    <td>{item.razao_social}</td>
                                    <td>{item.cnpj}</td>
                                    <td>{item.ie}</td>
                                    <td>{item.usuario.endereco}</td>
                                    <td>{item.usuario.cidade}</td>
                                    <td>{item.usuario.estado}</td>
                                    <td>{item.usuario.telefone}</td>
                                    <td>{item.usuario.email}</td>
                                    <td>{item.categoria}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { props.prepAtualizacao(item) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg> Editar
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => { props.prepRemocao(item) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg> Excluir
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}