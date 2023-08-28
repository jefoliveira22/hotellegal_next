import { Container, Table, Button } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import DESPESA from "../estados/useDespesa.js";

export default function TabelaTipoDespesas(props) {
    return (
        <Container className='mb-5'>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Button variant="outline-secondary" onClick={() => { props.exibirDespesa(DESPESA.listagem) }}>
                            Voltar
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>CÓDIGO DESPESA</th>
                        <th>DESCRIÇÃO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.dados.map((tipodespesas) => {
                            return (
                                <tr key={tipodespesas.cod_tipo_desp}>
                                    <td>{tipodespesas.cod_tipo_desp}</td>
                                    <td>{tipodespesas.descr}</td>
                                    <td>
                                        <Button className="" size="sm" variant="outline-danger" onClick={() => { props.apagarTDespesa(tipodespesas) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </Button>
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