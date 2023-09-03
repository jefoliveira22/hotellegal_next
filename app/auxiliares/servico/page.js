"use client"
import { useEffect, useState } from "react";
import FormCADServico from "@/app/componentes/formularios/CADServico.js";
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import MenuAuxServico from "@/app/componentes/templates/MenuAuxServico.js";
import TabelaServico from "@/app/componentes/tabelas/TabelaServico.js";
import SERVICO from "@/app/componentes/estados/useServico.js";
import FormATUServico from "@/app/componentes/formularios/ATUServico.js";
import ipBackend from "@/app/componentes/IPBackend.js";
import TabelaConsumoServ from "@/app/componentes/tabelas/TabelaConsumoServ.js";
import FormServico from "@/app/componentes/formularios/Servicos.js";
import MODOBUCASERV from "@/app/componentes/estados/useModoBuscaServico.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado.js";

export default function TelaCadServico() {

    const [Servico, setServico] = useState(SERVICO.listagem);
    const [listaServicos, setListaServicos] = useState([]);
    const [atualizaServico, setAtualizaServico] = useState([]);
    const [buscaNome, setBuscaNome] = useState([]);
    const [busca, setBusca] = useState(MODOBUCASERV.consumoServ);
    const [modoBusca, setModoBusca] = useState(true);
    const [dadosConsumoServ, setDadosConsumoServ] = useState([]);

    useEffect(() => {
        if (busca === MODOBUCASERV.consumoServ) {
            if (modoBusca) {
                fetch(ipBackend + 'consumoserv',
                    {
                        method: "GET"
                    }).then((resposta) => {
                        return resposta.json()
                    }).then((dados) => {
                        setDadosConsumoServ(dados)
                    }).catch((erro) => {
                        alertaErro(erro);
                    });
            }
            else {
                fetch(ipBackend + 'consumoserv/' + buscaNome,
                    {
                        method: "GET"
                    }).then((resposta) => {
                        return resposta.json()
                    }).then((dados) => {
                        setDadosConsumoServ(dados)
                    }).catch((erro) => {
                        alertaErro(erro);
                    });
            }
        }
        else if (busca === MODOBUCASERV.servico) {  
            if (modoBusca) {
                fetch(ipBackend + 'servico',
                    {
                        method: "GET"
                    }).then((resposta) => {
                        return resposta.json()
                    }).then((dados) => {
                        setListaServicos(dados)
                    }).catch((erro) => {
                        alertaErro(erro);
                    });
            }
            else {
                fetch(ipBackend + 'servico/' + buscaNome,
                    {
                        method: "GET"
                    }).then((resposta) => {
                        return resposta.json()
                    }).then((dados) => {
                        setListaServicos(dados)
                    }).catch((erro) => {
                        alertaErro(erro);
                    });
            }
        }
    });

    function apagarServico(servicos) {
        const id_servico = { id_servico: servicos.id_servico }
        fetch(ipBackend + 'servico',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id_servico)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Serviço excluído com sucesso!")
                }
                else {
                    alert("Não foi possível excluir o serviço.")
                }
            });
    }

    function apagarConsumoServ(servicos) {
        const id_consumo_serv = { id_consumo_serv: servicos.id_consumo_serv }
        fetch(ipBackend + 'consumoserv',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id_consumo_serv)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Serviço excluído com sucesso!")
                }
                else {
                    alert("Não foi possível excluir o serviço.")
                }
            });
    }


    function prepararAtualizacao(servicos) {
        setServico(SERVICO.atualizarServico);
        setAtualizaServico(servicos);
    }

    function prepararRemocao(servicos) {
        apagarServico(servicos);
        setServico(SERVICO.listarServico);
    }

    function prepararRemocaoConsumoServ(servicos) {
        apagarConsumoServ(servicos);
        setServico(SERVICO.listagem);
    }

    if (Servico === SERVICO.listagem) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="GERENCIAR SERVIÇO" />
                <TabelaConsumoServ exibirServico={setServico}
                    dadosConsumoS={dadosConsumoServ}
                    apagarConsumoS={prepararRemocaoConsumoServ}
                    dadosNome={setBuscaNome}
                    escolheBusca={setBusca}
                    modoBuscar={setModoBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (Servico === SERVICO.cadastro) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="CADASTRAR SERVIÇO" />
                <FormServico exibirServico={setServico} />
                <RodapeLogado />
            </div>
        );
    }

    else if (Servico === SERVICO.atualizar) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="ATUALIZAR SERVIÇO" />
                <RodapeLogado />
            </div>
        );
    }

    else if (Servico === SERVICO.listarServico) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="LISTA DE SERVIÇO DE QUARTO" />
                <TabelaServico exibirServico={setServico}
                    dadosServicos={listaServicos}
                    editarServicos={prepararAtualizacao}
                    apagarServicos={prepararRemocao}
                    dadosNome={setBuscaNome}
                    modoBuscar={setModoBusca}
                    escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (Servico === SERVICO.cadastroServico) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="CADASTRAR SERVIÇO DE QUARTO" />
                <FormCADServico exibirServico={setServico} escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (Servico === SERVICO.atualizarServico) {
        return (
            <div>
                <MenuAuxServico />
                <Cabecalho titulopagina="ATUALIZAR SERVIÇO DE QUARTO" />
                <FormATUServico exibirServico={setServico} listaServico={atualizaServico} escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }
}