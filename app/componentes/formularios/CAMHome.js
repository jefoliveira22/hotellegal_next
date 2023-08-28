import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function TelaCAMHome(props) {
    return (
        <Container className='mt-3 mb-3 d-flex justify-content-center'>
                <Card style={{ width: '18rem' }} className='me-3 text-center'>
                    <Card.Img variant="top" src="https://www.sindrio.com.br/wp-content/uploads/2020/11/Imagens-para-o-site-Sindrio_CURSOS-28-780x470.png" />
                    <Card.Body>
                        <Card.Title>Gerenciar Camareiros</Card.Title>
                        <Card.Text>
                            Aqui você adiciona, remove, atualiza e lista os dados de camareiros.
                        </Card.Text>
                        <Button variant="outline-primary" onClick={() => {props.mudaTela(true)}}>Selecionar</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }} className='me-3 text-center'>
                    <Card.Img variant="top" src="https://esemprego.com.br/wp-content/uploads/2021/12/camareira-758x474.png" />
                    <Card.Body>
                        <Card.Title>Gerenciar Atividades</Card.Title>
                        <Card.Text>
                            Aqui você adiciona, remove, atualiza e lista as atividades dos camareiros.
                        </Card.Text>
                        <Button variant="outline-primary" onClick={() => {props.mudaTela(false)}}>Selecionar</Button>
                    </Card.Body>
                </Card>
        </Container>
    );
}