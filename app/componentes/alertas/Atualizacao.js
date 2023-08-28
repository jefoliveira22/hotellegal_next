import { confirmAlert } from "react-confirm-alert";

const confirmaAtualização = (dados) => {
    confirmAlert({
        title: "Atualização concluida!",
        message: dados.mensagem,
        buttons: [{
            label: "OK"
        }]
    });
};

export default confirmaAtualização;