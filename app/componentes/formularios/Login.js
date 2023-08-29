'use client'
import TelaCadHospede from "@/app/hospede/page";
import { useRef, useState } from "react";
import { Container, Button, Card, Form } from "react-bootstrap";

export default function FormLogin() {

    const [formValidado, setFormValidado] = useState(false);
    const logincpf = useRef("");
    const senha = useRef("");

    function validarDados() {
        if (logincpf === "jubileu" && senha === "jubileu123") {
            window.location.href = "/hospede"
        }
        else {
        
        }

    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            validarDados();
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    return (
        <Card className="text-center h-100">
            <Container className="position-absolute top-50 start-50 translate-middle">
                <Card.Title className="mt-4 mb-1">Faça o login</Card.Title>
                <Card.Body>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="m-auto me-1"><b>Usuário</b></Form.Label>
                            <Form.Control
                                type="text"
                                id="Logincpxf"
                                name="Logincpf"
                                ref={logincpf}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Label className="m-auto me-3"><b>Senha</b></Form.Label>
                            <Form.Control
                                type="password"
                                id="senha"
                                name="senha"
                                ref={senha}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Login</Button>
                    </Form>
                </Card.Body>
            </Container>
        </Card>
    )
}