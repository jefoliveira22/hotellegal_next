'use client'
import { Container, Button, Navbar, Nav, Form, Table } from "react-bootstrap";
import { useRef } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ImprimirDespesa } from "./ImprimirDespesa";
import DESPESA from "../estados/useDespesa";


export default function RelatorioDespesa(props) {

    const inicio = useRef("")
    const fim = useRef("")

    function buscar() {
        const periodo = {
            inicio: inicio.current.value,
            fim: fim.current.value
        }
        props.pesquisar(periodo)
    }

    const visualizarImpressao = async () => {
        const classeImpressao = new ImprimirDespesa(props.dadosRelatorio);
        const documento = await classeImpressao.preparaDocumento();
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }

    return (
        <Container className='mb-5'>
            <Navbar expand="lg" className="mt-2 mb-2" id="elementoFiltro">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Button variant="outline-secondary" onClick={() => { props.exibirDespesa(DESPESA.listagem) }} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg> Voltar
                        </Button>
                    </Nav>
                    <Form className="d-flex">
                            <Form.Control
                                type="date"
                                className="me-2"
                                name="inicio"
                                id="inicio"
                                ref={inicio}
                            />
                            <Form.Control
                                type="date"
                                className="me-2"
                                name="fim"
                                id="fim"
                                ref={fim}
                            />
                            <Button variant="outline-dark" onClick={buscar} className="me-2">Pesquisar</Button>
                            <Button variant="outline-primary" onClick={visualizarImpressao}> Imprimir</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PRODUTO</th>
                        <th>NFE</th>
                        <th>CATEGORIA</th>
                        <th>DATA</th>
                        <th>TOTAL NOTA</th>
                        <th>FORNECEDOR</th>
                        <th>CNPJ</th>
                        <th>TELEFONE</th>
                        <th>E-MAIL</th>
                        <th>CIDADE</th>
                        <th>PAGO</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        props.dadosRelatorio.map((item) => {
                            let data_compra = new Date(item.data_comp)
                            return (
                                <tr key={item.id_despesa}>
                                    <td>{item.id_despesa}</td>
                                    <td>{item.nome_desp}</td>
                                    <td>{item.nfe}</td>
                                    <td>{item.fornecedor.categoria}</td>
                                    <td>{data_compra.toLocaleDateString()}</td>
                                    <td>{item.valortotal}</td>
                                    <td>{item.fornecedor.razao_social}</td>
                                    <td>{item.fornecedor.cnpj}</td>
                                    <td>{item.fornecedor.usuario.telefone}</td>
                                    <td>{item.fornecedor.usuario.email}</td>
                                    <td>{item.fornecedor.usuario.cidade}</td>
                                    <td>{item.pago}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}