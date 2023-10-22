import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FORNECEDORES from '../estados/useFornecedores';

export default function CADFornecedor(props) {

    const [formValidado, setFormValidado] = useState(false); /* ESTADO QUE GERENCIA SE O FORMULARIO ESTA VALIDADO OU NÃO */
    const dadosAtualização = props.atualizaFornecedor

    useEffect(() => { /* AO CHAMAR A PAGINA, O USEEFFECT VAI VERIFICAR SE EXISTE DADOS PARA ATUALIZAR, SE SIM VAI PREENCHER OS CAMPOS */
        if (props.atualizaFornecedor) {
            razao_social.current.value = props.atualizaFornecedor.razao_social
            cnpj.current.value = props.atualizaFornecedor.cnpj
            ie.current.value = props.atualizaFornecedor.ie
            categoria.current.value = props.atualizaFornecedor.categoria
            nome.current.value = props.atualizaFornecedor.usuario.nome
            email.current.value = props.atualizaFornecedor.usuario.email
            endereco.current.value = props.atualizaFornecedor.usuario.endereco
            telefone.current.value = props.atualizaFornecedor.usuario.telefone
            cidade.current.value = props.atualizaFornecedor.usuario.cidade
            estado.current.value = props.atualizaFornecedor.usuario.estado
            cep.current.value = props.atualizaFornecedor.usuario.cep
        }
    }, []);

    const nome = useRef("");  /* USEREF UTILIZADO PARA PEGAR AS INFORMAÇÕES PREENCHIDAS NOS CAMPOS - SEMELHANTE GETELEMENTBYID */
    const email = useRef("");
    const razao_social = useRef("");
    const cnpj = useRef("");
    const ie = useRef("");
    const categoria = useRef("");
    const endereco = useRef("");
    const telefone = useRef("");
    const cidade = useRef("");
    const estado = useRef("");
    const cep = useRef("");

    function preparaJSON() {  /* FUNÇÃO QUE MONTA O JSON QUE SERÁ ENVIADO PARA O BACKEND */
        if (dadosAtualização) {
            const fornecedor = {
                fornecedor_id: props.atualizaFornecedor.fornecedor_id,
                razao_social: razao_social.current.value,
                cnpj: cnpj.current.value,
                ie: ie.current.value,
                categoria: categoria.current.value,
                usuario: {
                    usuario_id: props.atualizaFornecedor.usuario.usuario_id,
                    nome: nome.current.value,
                    email: email.current.value,
                    endereco: endereco.current.value,
                    telefone: telefone.current.value,
                    cidade: cidade.current.value,
                    estado: estado.current.value,
                    cep: cep.current.value,
                    tipo_usuario: "nulo"
                }
            }
            return fornecedor
        }
        else {
            const fornecedor = {
                razao_social: razao_social.current.value,
                cnpj: cnpj.current.value,
                ie: ie.current.value,
                categoria: categoria.current.value,
                usuario: {
                    nome: nome.current.value,
                    email: email.current.value,
                    endereco: endereco.current.value,
                    telefone: telefone.current.value,
                    cidade: cidade.current.value,
                    estado: estado.current.value,
                    cep: cep.current.value,
                    tipo_usuario: "nulo"
                }
            }
            return fornecedor
        }
    }

    function manipularSubmissao(evento) {  /* FUNÇÃO QUE MANIPULA A SUBMISSÃO DO FORMULARIO IDENTIFICANDO CAMPOS NÃO PREENCHIDOS */
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            if (dadosAtualização) { /* CONDIÇÃO QUE SE OUVER DADOS NA PROPS ATUALIZAFORNECEDOR, EXECUTA A ATUALIZAÇÃO, SENÃO E CADASTRO */
                const dados = preparaJSON();
                props.exeAtualizacao(dados);
            }
            else {
                const dados = preparaJSON();
                props.cadastraForn(dados);
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
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Nome Fantasia</Form.Label>
                            <Form.Control
                                id="nome"
                                name="nome"
                                required
                                type="text"
                                ref={nome}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome fantasia da empresa
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Razão Social</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='razao_social'
                                    name='razao_social'
                                    type="text"
                                    required
                                    ref={razao_social}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a razão social da empresa
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Inscrição Estadual</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='ie'
                                    name='ie'
                                    type="text"
                                    required
                                    ref={ie}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a inscrição estadual
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>CNPJ</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='cnpj'
                                    name='cnpj'
                                    type="text"
                                    required
                                    ref={cnpj}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o CNPJ da empresa
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Endereço</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='endereco'
                                    name='endereco'
                                    type="text"
                                    required
                                    ref={endereco}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o endereço
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='telefone'
                                    name='telefone'
                                    type="tel"
                                    required
                                    ref={telefone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o telefone
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Cidade</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='cidade'
                                    name='cidade'
                                    type="text"
                                    required
                                    ref={cidade}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a cidade
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Form.Group>
                            <Form.Label>UF</Form.Label>
                            <Form.Select
                                id="estado"
                                name="estado"
                                required
                                ref={estado}>
                                <option></option>
                                <option value="SP">SP</option>
                                <option value="PR">PR</option>
                                <option value="RJ">RJ</option>
                                <option value="MG">MG</option>
                                <option value="MT">MT</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Informe a UF
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>CEP</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='cep'
                                    name='cep'
                                    type="text"
                                    required
                                    ref={cep}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o CEP
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2 d-flex justify-content-center'>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                id="email"
                                name="email"
                                required
                                type="text"
                                ref={email}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o e-mail da empresa
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                id="categoria"
                                name="categoria"
                                required
                                ref={categoria}>
                                <option></option>
                                <option value="Produtos Químicos">Produtos Químicos</option>
                                <option value="Alimentícios">Alimentícios</option>
                                <option value="Móveis e Eletro">Móveis e Eletro</option>
                                <option value="Papelaria">Papelaria</option>
                                <option value="Informática">Informática</option>
                                <option value="Prestação de serviços">Prestação de serviços</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Informe a categoria
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Cadastrar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.mudaFornecedor(FORNECEDORES.listfornecedor) }}>Voltar</Button>
            </Form>
        </Container>
    );
}