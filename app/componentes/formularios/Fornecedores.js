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
            nome.current.value = props.atualizaFornecedor.usuario.nome
            email.current.value = props.atualizaFornecedor.usuario.email
            nome_empresa.current.value = props.atualizaFornecedor.nome_empresa
            cnpj.current.value = props.atualizaFornecedor.cnpj
            tipo_usuario.current.value = props.atualizaFornecedor.usuario.tipo_usuario
            senha.current.value = props.atualizaFornecedor.usuario.senha
        }
    }, []);

    const nome = useRef("");  /* USEREF UTILIZADO PARA PEGAR AS INFORMAÇÕES PREENCHIDAS NOS CAMPOS - SEMELHANTE GETELEMENTBYID */
    const email = useRef("");
    const nome_empresa = useRef("");
    const cnpj = useRef("");
    const tipo_usuario = useRef("");
    const senha = useRef("");

    function preparaJSON() {  /* FUNÇÃO QUE MONTA O JSON QUE SERÁ ENVIADO PARA O BACKEND */
        if (dadosAtualização) {
            const funcionario = {
                fornecedor_id: props.atualizaFornecedor.fornecedor_id,
                nome_empresa: nome_empresa.current.value,
                cnpj: cnpj.current.value,
                usuario: {
                    usuario_id: props.atualizaFornecedor.usuario.usuario_id,
                    nome: nome.current.value,
                    email: email.current.value,
                    senha: senha.current.value,
                    tipo_usuario: tipo_usuario.current.value
                }
            }
            return funcionario
        }
        else {
            const funcionario = {
                nome_empresa: nome_empresa.current.value,
                cnpj: cnpj.current.value,
                usuario: {
                    nome: nome.current.value,
                    email: email.current.value,
                    senha: senha.current.value,
                    tipo_usuario: tipo_usuario.current.value
                }
            }
            return funcionario
        }
    }

    function manipularSubmissao(evento) {  /* FUNÇÃO QUE MANIPULA A SUBMISSÃO DO FORMULARIO IDENTIFICANDO CAMPOS NÃO PREENCHIDOS */
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            if (dadosAtualização) { /* CONDIÇÃO QUE SE OUVER DADOS NA PROPS ATUALIZAFUNCIONARIO, EXECUTA A ATUALIZAÇÃO, SENÃO E CADASTRO */
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
                    <Col>
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
                    <Col>
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
                    <Col>
                        <Form.Group>
                            <Form.Label>Razão Social</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='nome_empresa'
                                    name='nome_empresa'
                                    type="text"
                                    required
                                    ref={nome_empresa}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a razão social da empresa
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
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Permissão de Acesso</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='tipo_usuario'
                                    name='tipo_usuario'
                                    type="text"
                                    required
                                    ref={tipo_usuario}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a permissão de acesso da empresa
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Senha de acesso</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='senha'
                                    name='senha'
                                    type="password"
                                    required
                                    ref={senha}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe a senha da acesso da empresa
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Cadastrar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.mudaFornecedor(FORNECEDORES.listfornecedor) }}>Voltar</Button>
            </Form>
        </Container>
    );
}