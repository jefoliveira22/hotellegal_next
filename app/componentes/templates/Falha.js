import Alert from 'react-bootstrap/Alert';

export default function Falha(props) {
    return (
        <Alert variant="danger">
            {props.mensagem}
        </Alert>
    );
}