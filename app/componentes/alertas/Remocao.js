import { confirmAlert } from "react-confirm-alert";

const confirmaRemocao = (dados) => {
    confirmAlert({
        title: "Remoção concluida!",
        message: dados.mensagem,
        buttons: [{
            label: "OK"
        }]
    });
};

export default confirmaRemocao;