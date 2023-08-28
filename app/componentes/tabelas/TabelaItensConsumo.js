import { Container, Table, Button, Row } from "react-bootstrap";

export default function TabelaItensConsumo(props) {

    var totalItens = 0;

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>DESCRIÇÃO PRODUTO</th>
                        <th>PREÇO</th>
                        <th>QUANTIDADE</th>
                        <th>SUBTOTAL</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaItens?.map((item, indice) => {
                        totalItens += parseFloat(item.subtotal)
                        return <tr key={indice}>
                            <td>{item.id_prod}</td>
                            <td>{item.descricao}</td>
                            <td>R$ {item.preco}</td>
                            <td>{item.qtde}</td>
                            <td>R$ {item.subtotal.toFixed(2)}</td>
                            <td>
                                <Button variant="outline-danger" size="sm" onClick={() => {
                                    const lista = props.listaItens.filter((prod) => prod.id_prod !== item.id_prod);
                                    props.setItens({...props.dadosItens, listaProdutos:lista});
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <Row className="text-end">
                <hr></hr>
                <p><strong>TOTAL GERAL: R$ {totalItens.toFixed(2)}</strong></p>
            </Row>
        </Container>
    );
}