import { Container, Button, Card, Form } from "react-bootstrap";

export default function FormLogin() {
    return (
        <Container className='mb-3 mt-3 d-flex justify-content-center align-itens-center'>
            <Card className="text-center">
                <Card.Title className="mt-2 mb-1">Faça o login</Card.Title>
                <Card.Body>
                    <Form.Group className="mb-3 d-flex align-items-center">
                        <Form.Label className="me-2"><b>Login</b></Form.Label>
                            <Form.Control
                                type="text"
                                id="Logincpf"
                                name="Logincpf"
                                required
                            />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex align-items-center">
                        <Form.Label className="me-2"><b>Senha</b></Form.Label>
                            <Form.Control
                                type="password"
                                id="senha"
                                name="senha"
                                required
                            />
                    </Form.Group>
                        <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Login</Button>
                        <Button variant="outline-secondary" className='mt-3'>Voltar</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}