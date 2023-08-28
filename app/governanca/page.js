"use client"
import Menu from "../componentes/templates/Menu.js";
import Cabecalho from "../componentes/templates/Cabecalho.js";
import CAMAREIRO from "../componentes/estados/useCamareiro.js";
import { useState, useEffect } from "react";
import TelaCAMHome from "../componentes/formularios/CAMHome.js";
import TabelaCamareiro from "../componentes/tabelas/TabelaCamareiro.js";
import ipBackend from "../componentes/IPBackend.js";
import TelaCADCamareiro from "../componentes/formularios/Camareiro.js";
import TabelaATVCamareiro from "../componentes/tabelas/TabelaAtvCamareiro.js";
import TelaCADATVCamareiro from "../componentes/formularios/ATVCamareiro.js";
import alertaErro from "../componentes/alertas/Erro.js";
import confirmaGravação from "../componentes/alertas/Gravacao.js";
import confirmaAtualização from "../componentes/alertas/Atualizacao.js";

export default function TelaGovernanca(props) {

    const [estadoTela, setEstadoTela] = useState(CAMAREIRO.home);
    const [camareiros, setCamareiros] = useState([]);
    const [atualizarCamareiro, setAtualizaCamareiro] = useState([]);
    const [busca, setBusca] = useState(true);
    const [valorBusca, setValorBusca] = useState([]);
    const [buscaCamareiro, setBuscaCamareiro] = useState(true);
    const [atvCamareiros, setAtvCamareiros] = useState([]);
    const [atualizarATVCamareiro, setAtualizaATVCamareiro] = useState([]);
    const [buscaATV, setBuscaATV] = useState(true);

    useEffect(() => {
        if (buscaCamareiro) {
            if (busca) {
                fetch(ipBackend + 'camareiro',
                {method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setCamareiros(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
            }
            else {
                fetch(ipBackend + 'camareiro/' +  valorBusca,
                {method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setCamareiros(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
            }
        }
        else {
            if (buscaATV) {
                fetch(ipBackend + 'atvcamareiro',
                {method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setAtvCamareiros(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
            }
            else {
                fetch(ipBackend + 'atvcamareiro/' +  valorBusca,
                {method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setAtvCamareiros(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
            }
        }
    })

    function defineTelaBusca(estado) {
        if (estado) {
            setBuscaCamareiro(true);
            setEstadoTela(CAMAREIRO.listacam);
        }
        else {
            setBuscaCamareiro(false);
            setEstadoTela(CAMAREIRO.listaatv);
        }
    }

    function cadastrarCamareiros(camareiros) {
        fetch(ipBackend + "camareiro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(camareiros)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    } 

    function atualizarCamareiros(camareiros) {
        fetch(ipBackend + "camareiro", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(camareiros)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
            setEstadoTela(CAMAREIRO.listacam);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function prepararAtualizacaoCamareiro(camareiro) {
        setAtualizaCamareiro(camareiro);
        setEstadoTela(CAMAREIRO.atualizacam);
    }

    function removerCamareiro(camareiro) {
        const CPF = { cpf_cam: camareiro.cpf_cam }
        fetch(ipBackend + 'camareiro',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(CPF)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Camareiro excluído com sucesso!")
                }
                else {
                    alert("Camareiro possui atividades cadastradas. Remova antes de excluir.")
                }
            });
        setEstadoTela(CAMAREIRO.listacam);
    }

    function cadastrarATVCamareiros(atvcamareiros) {
        fetch(ipBackend + "atvcamareiro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atvcamareiros)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaGravação(dados);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function prepararAtualizacaoATVCamareiro(atvcamareiro) {
        setAtualizaATVCamareiro(atvcamareiro);
        setEstadoTela(CAMAREIRO.atualizaatv);
    }

    function atualizarATVCamareiros(atvcamareiros) {
        fetch(ipBackend + "atvcamareiro", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atvcamareiros)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
            setEstadoTela(CAMAREIRO.listaatv);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function removerATVCamareiro(atvcamareiro) {
        const ID = { id_atv: atvcamareiro.id_atv }
        fetch(ipBackend + 'atvcamareiro',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ID)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Atividade removida com sucesso!")
                }
                else {
                    alert("Não foi possível remover a atividade.")
                }
            });
        setEstadoTela(CAMAREIRO.listaatv);
    }


    if (estadoTela === CAMAREIRO.home) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="GOVERNANÇA"/>
                <TelaCAMHome mudaTela={defineTelaBusca}/>
            </div>
        );
    }

    else if (estadoTela === CAMAREIRO.listacam) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="CAMAREIROS CADASTRADOS"/>
                <TabelaCamareiro mudaTela={setEstadoTela} 
                                 listaCamareiros={camareiros}
                                 exeAtualizacao={prepararAtualizacaoCamareiro}
                                 exeRemocao={removerCamareiro}
                                 cpfBusca={setValorBusca}
                                 modoBusca={setBusca}
                                 /> 
            </div>
        );
    }

    else if (estadoTela === CAMAREIRO.listaatv) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="ATIVIDADES CADASTRADAS"/>
                <TabelaATVCamareiro mudaTela={setEstadoTela}
                                    listaAtvCamareiros={atvCamareiros}
                                    exeAtualizacaoATV={prepararAtualizacaoATVCamareiro}
                                    exeRemocao={removerATVCamareiro}
                                    cpfBusca={setValorBusca}
                                    modoBusca={setBuscaATV}/>
            </div>
        );
    }

    else if (estadoTela === CAMAREIRO.cadastracam) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="CADASTRAR CAMAREIRO"/>
                <TelaCADCamareiro mudaTela={setEstadoTela} exCad={cadastrarCamareiros}/>
            </div>
        );
    }
    
    else if (estadoTela === CAMAREIRO.cadastraatv) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="CADASTRAR ATIVIDADE"/>
                <TelaCADATVCamareiro mudaTela={setEstadoTela} exCadATV={cadastrarATVCamareiros}/>
            </div>
        );
    }

    else if (estadoTela === CAMAREIRO.atualizacam) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR CAMAREIRO"/>
                <TelaCADCamareiro mudaTela={setEstadoTela} 
                                  atuCamareiros={atualizarCamareiro}
                                  exAtu={atualizarCamareiros}/>
            </div>
        );
    }

    else if (estadoTela === CAMAREIRO.atualizaatv) {
        return (
            <div>
                <Menu />
                <Cabecalho titulopagina="ATUALIZAR ATIVIDADE"/>
                <TelaCADATVCamareiro mudaTela={setEstadoTela} 
                                     atuATVCamareiros={atualizarATVCamareiro}
                                     exAtuATV={atualizarATVCamareiros}/>
            </div>
        );
    }
}