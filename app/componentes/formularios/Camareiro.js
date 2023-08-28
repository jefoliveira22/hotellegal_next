import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import CAMAREIRO from "../estados/useCamareiro.js";

export default function TelaCADCamareiro(props) {

    const atualizarCamareiro = props.atuCamareiros

    useEffect(() => {
        if (props.atuCamareiros) {
            cpf_cam.current.value = props.atuCamareiros.cpf_cam
            nome_cam.current.value = props.atuCamareiros.nome_cam
            data_nasc.current.value = props.atuCamareiros.data_nasc
            endereco_cam.current.value = props.atuCamareiros.endereco_cam
            bairro.current.value = props.atuCamareiros.bairro
            cidade_cam.current.value = props.atuCamareiros.cidade_cam
            uf_cam.current.value = props.atuCamareiros.uf_cam
            nis.current.value = props.atuCamareiros.nis
            genero.current.value = props.atuCamareiros.genero
        }
    }, []);

    const [formValidado, setFormValidado] = useState(false);
    const nome_cam = useRef("");
    const cpf_cam = useRef("");
    const data_nasc = useRef("");
    const endereco_cam = useRef("");
    const bairro = useRef("");
    const cidade_cam = useRef("");
    const uf_cam = useRef("");
    const nis = useRef("");
    const genero = useRef("");

    function validarDados() {
        const camareiro = {
            cpf_cam: cpf_cam.current.value,
            nome_cam: nome_cam.current.value,
            data_nasc: data_nasc.current.value,
            endereco_cam: endereco_cam.current.value,
            bairro: bairro.current.value,
            cidade_cam: cidade_cam.current.value,
            uf_cam: uf_cam.current.value,
            nis: nis.current.value,
            genero: genero.current.value,
        }
        if (camareiro.nome_cam && camareiro.cpf_cam && camareiro.data_nasc && camareiro.endereco_cam && camareiro.bairro && camareiro.cidade_cam && camareiro.uf_cam && camareiro.nis && camareiro.genero) {
            return camareiro;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novocamareiro = validarDados();
            if (novocamareiro && atualizarCamareiro) {
                props.exAtu(novocamareiro);
                props.mudaTela(CAMAREIRO.listacam);
            } 
            else {
                props.exCad(novocamareiro);
                props.mudaTela(CAMAREIRO.listacam);
            }

        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    return (
        <Container className="mb-3 mt-3 text-center">
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                                id="nome_cam"
                                name="nome_cam"
                                required
                                type="text"
                                ref={nome_cam}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do camareiro
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="cpf_cam"
                                    name="cpf_cam"
                                    type="text"
                                    required
                                    ref={cpf_cam}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o CPF
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Data nascimento</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="data_nasc"
                                    name="data_nasc"
                                    type="date"
                                    ref={data_nasc}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a data nascimento
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                id="endereco_cam"
                                name="endereco_cam"
                                type="text"
                                ref={endereco_cam}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o endereço
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                id="bairro"
                                name="bairro"
                                type="text"
                                ref={bairro}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o bairro
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                id="cidade_cam"
                                name="cidade_cam"
                                type="text"
                                ref={cidade_cam}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe a cidade
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>UF</Form.Label>
                            <Form.Control
                                id="uf_cam"
                                name="uf_cam"
                                ref={uf_cam}
                                type="text"
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o UF
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>NIS</Form.Label>
                            <Form.Control
                                id="nis"
                                name="nis"
                                type="text"
                                ref={nis}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o NIS
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Gênero</Form.Label>
                            <Form.Select
                                id="genero"
                                name="genero"
                                required
                                ref={genero}>
                                <option></option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Informe o gênero
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Cadastrar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.mudaTela(CAMAREIRO.listacam) }}>Voltar</Button>
            </Form>
        </Container>
    )
}