import { confirmAlert } from "react-confirm-alert";

const confirmaGravação = (dados) => {
    confirmAlert({
        title: "Gravação concluida!",
        message: dados.mensagem,
        buttons: [{
            label: "OK"
        }]
    });
};

export default confirmaGravação;