import { confirmAlert } from "react-confirm-alert";

const alertaErro = (erro) => {
    confirmAlert({
        title: "Ops... Houve um problema!",
        message: erro.mensagem,
        buttons: [{
            label: "OK"
        }]
    });
};

export default alertaErro;