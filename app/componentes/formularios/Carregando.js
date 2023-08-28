import { Container, Spinner } from "react-bootstrap";

export default function Carregando(props) {
    return (
        <Container className="d-flex mt-5 justify-content-center">
            <Spinner animation="grow" role="status"/>
            <Spinner animation="grow" role="status"/>
            <Spinner animation="grow" role="status"/>
        </Container>
    );
}