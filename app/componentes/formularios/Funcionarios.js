import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FUNCIONARIOS from '../estados/useFuncionarios';

export default function CADFuncionario(props) {

    const [formValidado, setFormValidado] = useState(false); /* ESTADO QUE GERENCIA SE O FORMULARIO ESTA VALIDADO OU NÃO */
    const dadosAtualização = props.atualizaFuncionario

    useEffect(() => { /* AO CHAMAR A PAGINA, O USEEFFECT VAI VERIFICAR SE EXISTE DADOS PARA ATUALIZAR, SE SIM VAI PREENCHER OS CAMPOS */
        if (props.atualizaFuncionario) {
            sexo.current.value = props.atualizaFuncionario.sexo
            datanasc.current.value = props.atualizaFuncionario.datanasc
            cargo.current.value = props.atualizaFuncionario.cargo
            salario.current.value = props.atualizaFuncionario.salario
            nis.current.value = props.atualizaFuncionario.nis
            senha.current.value = props.atualizaFuncionario.senha
            nome.current.value = props.atualizaFuncionario.usuario.nome
            email.current.value = props.atualizaFuncionario.usuario.email
            endereco.current.value = props.atualizaFuncionario.usuario.endereco
            telefone.current.value = props.atualizaFuncionario.usuario.telefone
            cidade.current.value = props.atualizaFuncionario.usuario.cidade
            estado.current.value = props.atualizaFuncionario.usuario.estado
            cep.current.value = props.atualizaFuncionario.usuario.cep
            tipo_usuario.current.value = props.atualizaFuncionario.usuario.tipo_usuario
        }
    }, []);

    const nome = useRef("");  /* USEREF UTILIZADO PARA PEGAR AS INFORMAÇÕES PREENCHIDAS NOS CAMPOS - SEMELHANTE GETELEMENTBYID */
    const email = useRef("");
    const cargo = useRef("");
    const salario = useRef("");
    const tipo_usuario = useRef("");
    const senha = useRef("");
    const endereco = useRef("");
    const telefone = useRef("");
    const cidade = useRef("");
    const estado = useRef("");
    const cep = useRef("");
    const nis = useRef("");
    const sexo = useRef("");
    const datanasc = useRef("");

    function preparaJSON() {  /* FUNÇÃO QUE MONTA O JSON QUE SERÁ ENVIADO PARA O BACKEND */
        if (dadosAtualização) {
            const funcionario = {
                funcionario_id: props.atualizaFuncionario.funcionario_id,
                sexo: sexo.current.value,
                datanasc: datanasc.current.value,
                cargo: cargo.current.value,
                salario: salario.current.value,
                nis: nis.current.value,
                senha: senha.current.value,
                usuario: {
                    usuario_id: props.atualizaFuncionario.usuario.usuario_id,
                    nome: nome.current.value,
                    email: email.current.value,
                    endereco: endereco.current.value,
                    telefone: telefone.current.value,
                    cidade: cidade.current.value,
                    estado: estado.current.value,
                    cep: cep.current.value,
                    tipo_usuario: tipo_usuario.current.value
                }
            }
            return funcionario
        }
        else {
            const funcionario = {
                sexo: sexo.current.value,
                datanasc: datanasc.current.value,
                cargo: cargo.current.value,
                salario: salario.current.value,
                nis: nis.current.value,
                senha: senha.current.value,
                usuario: {
                    nome: nome.current.value,
                    email: email.current.value,
                    endereco: endereco.current.value,
                    telefone: telefone.current.value,
                    cidade: cidade.current.value,
                    estado: estado.current.value,
                    cep: cep.current.value,
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
                props.cadastraFunc(dados);
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    return (
        <Container className="mb-3 mt-3 text-center">
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row className='mt-2'>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                id="nome"
                                name="nome"
                                required
                                type="text"
                                ref={nome}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do funcionário
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
                                type="email"
                                ref={email}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o e-mail do funcionário
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                id="datanasc"
                                name="datanasc"
                                required
                                type="date"
                                ref={datanasc}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe a data de nascimento
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Gênero</Form.Label>
                            <Form.Select
                                id="sexo"
                                name="sexo"
                                required
                                ref={sexo}>
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
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Cargo</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='cargo'
                                    name='cargo'
                                    type="text"
                                    required
                                    ref={cargo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o cargo do funcionário
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Salário</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='salario'
                                    name='salario'
                                    type="number"
                                    required
                                    ref={salario}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o salário do funcionário
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>NIS</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id='nis'
                                    name='nis'
                                    type="text"
                                    required
                                    ref={nis}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o NIS
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Permissão de Acesso</Form.Label>
                            <Form.Select
                                id="tipo_usuario"
                                name="tipo_usuario"
                                required
                                ref={tipo_usuario}>
                                <option></option>
                                <option value="gerente">Gerente</option>
                                <option value="atendente">Atendente</option>
                                <option value="auxiliar">Auxiliar</option>
                                <option value="hospede">Cliente</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Informe a permissão de acesso
                            </Form.Control.Feedback>
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
                                    Informe a senha de acesso do funcionário
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mt-3 me-2' variant='outline-primary'>Cadastrar</Button>
                <Button variant="outline-secondary" className='mt-3' onClick={() => { props.mudaFuncionario(FUNCIONARIOS.listfuncionario) }}>Voltar</Button>
            </Form>
        </Container>
    );
}