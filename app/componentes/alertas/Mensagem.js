import { confirmAlert } from "react-confirm-alert";

const alertaErroLogin = (erro) => {
    confirmAlert({
        title: "Usuário ou senha inválidos.",
        message: erro.mensagem,
        buttons: [{
            label: "Tentar novamente"
        }]
    });
};

export default alertaErroLogin;