import { Container, Table, Button, Accordion } from "react-bootstrap";
import CONSUMO from "../estados/useConsumo.js";
import { Form, Navbar, Nav } from "react-bootstrap";
import { useRef } from "react";
import MODOBUSCACONS from "../estados/useModoBuscaConsumo.js";

export default function TabelaConsumos(props) {

    function passaNome() {
        const dadosnome = pesquisa.current.value
        props.escolheBusca(MODOBUSCACONS.consumo);
        props.modoBuscar(false);
        props.dadosNome(dadosnome)
    }

    function mudaConsumoTela() {
        props.exibirConsumo(CONSUMO.listarProduto);
        props.escolheBusca(MODOBUSCACONS.produto);
    }

    const pesquisa = useRef("")

    return (
        <Container className='mb-5'>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Button variant="outline-success" className="me-2" onClick={() => { props.exibirConsumo(CONSUMO.cadastro) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg> Adicionar Consumos
                        </Button>
                        <Button variant="outline-primary" className="me-2" onClick={mudaConsumoTela}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                            </svg> Listar Produtos
                        </Button>
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
                        <Button variant="outline-dark" onClick={passaNome}>Pesquisar</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Table className="text-center">
                <thead>
                    <tr>
                        <th>LISTA DE CONSUMOS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.dadosConsumos.map((consumos) => {
                            let data_cons = new Date(consumos.data_cons);
                            let desconto = parseFloat(consumos.desconto);
                            let valor = parseFloat(consumos.valor);
                            return (
                                <tr key={consumos.id_consumo}>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <p>
                                                    <strong>ID:</strong> {consumos.id_consumo}  |
                                                    <strong>  NOME:</strong> {consumos.hospedagem.reserva.hospede.nome}  |
                                                    <strong>  QUARTO:</strong> {consumos.hospedagem.reserva.acomodacao}  |
                                                    <strong>  DATA:</strong> {data_cons.toLocaleDateString()}
                                                </p>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <p><strong>ID HOSPEDAGEM:</strong> {consumos.hospedagem.id_hospedagem} |
                                                    <strong> DESCONTO:</strong> R$ {desconto.toFixed(2)} |
                                                    <strong> VALOR TOTAL:</strong> R$ {valor.toFixed(2)}</p>
                                                    <p><Button className="text-end" size="sm" variant="outline-danger" onClick={() => { props.apagarConsumos(consumos) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg> REMOVER
                                                    </Button>
                                                </p>
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>PRODUTO</th>
                                                            <th>QUANTIDADE</th>
                                                            <th>VALOR UNITÁRIO</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {consumos.listaProdutos.map((linha, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{linha.produto.nome_prod}</td>
                                                                    <td>{linha.qte_prod}</td>
                                                                    <td>{linha.valor_prod}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );

}