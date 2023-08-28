import { Container, Alert } from "react-bootstrap";

export default function Erro(props) {
    return (
        <Container className="mt-4">
            <Alert variant="danger">
                {props.mensagem}
            </Alert>
        </Container>
    );
}

