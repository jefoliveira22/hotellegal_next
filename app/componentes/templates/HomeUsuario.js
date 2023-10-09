import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import USUARIOS from '../estados/useUsuarios';

export default function UsuariosHome(props) {
    return (
        <Container className='mt-3 mb-3 d-flex justify-content-center'>
                <Card style={{ width: '18rem' }} className='me-3 text-center'>
                    <Card.Img variant="top" src="https://intranetnow.lumis.com.br/data/files/CF/43/33/CE/F7A6A61091ACB2A68E0BF9C2/artigo__integracao-de-funcionarios__interna-01.png" />
                    <Card.Body>
                        <Card.Title>Gerenciar Funcionários</Card.Title>
                        <Card.Text>
                            Aqui você adiciona, remove, atualiza e lista os dados de funcionários.
                        </Card.Text>
                        <Button variant="outline-primary" onClick={() => {props.mudaTela(USUARIOS.telafunc)}}>Selecionar</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='me-3 text-center'>
                    <Card.Img variant="top" src="https://blog.goakira.com.br/wp-content/uploads/2022/06/iStock-1266400602-1-1024x683.jpg" />
                    <Card.Body>
                        <Card.Title>Gerenciar Fornecedores</Card.Title>
                        <Card.Text>
                            Aqui você adiciona, remove, atualiza e lista as atividades dos fornecedores.
                        </Card.Text>
                        <Button variant="outline-primary" onClick={() => {props.mudaTela(USUARIOS.telaforn)}}>Selecionar</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='me-3 text-center'>
                    <Card.Img variant="top" src="https://www.sinch.com/sites/default/files/styles/small/public/image/2022-12/Os%206%20principais%20tipos%20de%20clientes%20e%20como%20lidar%20com%20cada%20um%20deles%20-%20Capa.png?itok=GPuhmK6w" />
                    <Card.Body>
                        <Card.Title>Gerenciar Clientes</Card.Title>
                        <Card.Text>
                            Aqui você adiciona, remove, atualiza e lista as atividades dos clientes.
                        </Card.Text>
                        <Button variant="outline-primary" onClick={() => {props.mudaTela(USUARIOS.telacli)}}>Selecionar</Button>
                    </Card.Body>
                </Card>
        </Container>
    );
}