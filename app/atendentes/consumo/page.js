"use client"
import { useEffect, useState } from "react";
import FormCADConsumo from "@/app/componentes/formularios/CADConsumo.js";
import Cabecalho from "@/app/componentes/templates/Cabecalho.js";
import MenuAtendente from "@/app/componentes/templates/MenuAtendente.js";
import TabelaConsumos from "@/app/componentes/tabelas/TabelaConsumo.js";
import CONSUMO from "@/app/componentes/estados/useConsumo.js";
import MODOBUSCACONS from "@/app/componentes/estados/useModoBuscaConsumo.js";
import FormATUConsumo from "@/app/componentes/formularios/ATUConsumo.js";
import ipBackend from "@/app/componentes/IPBackend.js";
import FormCADProduto from "@/app/componentes/formularios/Produto.js";
import TabelaProdutos from "@/app/componentes/tabelas/TabelaProdutos.js";
import alertaErro from "@/app/componentes/alertas/Erro.js";
import confirmaAtualização from "@/app/componentes/alertas/Atualizacao.js";
import RodapeLogado from "@/app/componentes/templates/RodapeLogado";

export default function TelaCadConsumo() {

    const [consumo, setConsumo] = useState(CONSUMO.listagem);
    const [listaConsumos, setListaConsumos] = useState([]);
    const [atualizaConsumo, setAtualizaConsumo] = useState([]);
    const [buscaNome, setBuscaNome] = useState([]);
    const [busca, setBusca] = useState(MODOBUSCACONS.consumo);
    const [modoBusca, setModoBusca] = useState(true);
    const [atualizaProduto, setAtualizaProduto] = useState([]);
    const [dadosProdutos, setDadosProdutos] = useState([]);

    useEffect (() => {
        if (busca === MODOBUSCACONS.consumo) {
            if (modoBusca) {
                fetch(ipBackend + 'consumo',
                {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setListaConsumos(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
            }
            else {
                fetch(ipBackend + 'consumo/' + buscaNome,
                {
                    method: "GET"
                }).then((resposta) => {
                    return resposta.json()
                }).then((dados) => {
                    setListaConsumos(dados);
                }).catch((erro) => {
                    alertaErro(erro);
                });
            }
        }
        else if (busca === MODOBUSCACONS.produto) {
            if (modoBusca) {
                fetch(ipBackend + 'produto',
                    {
                        method: "GET"
                    }).then((resposta) => {
                        return resposta.json()
                    }).then((dados) => {
                        setDadosProdutos(dados);
                    }).catch((erro) => {
                        alertaErro(erro);
                    });
            }
            else {
                fetch(ipBackend + 'produto/' + buscaNome,
                    {
                        method: "GET"
                    }).then((resposta) => {
                        return resposta.json()
                    }).then((dados) => {
                        setDadosProdutos(dados);
                    }).catch((erro) => {
                        alertaErro(erro);
                    });
            }
        }
        
    });

    function atualizarProdutos(produtos) {
        fetch(ipBackend + "produto", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produtos)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            confirmaAtualização(dados);
            setConsumo(CONSUMO.listarProduto);
        }).catch((erro) => {
            alertaErro(erro);
        });
    }

    function apagarConsumo(consumos) {
        const id_consumo = { id_consumo: consumos.id_consumo }
        fetch(ipBackend + 'consumo',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id_consumo)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Consumo excluído com sucesso!")
                }
                else {
                    alert("Não foi possível excluir o consumo.")
                }
            });
    }

    function apagarProduto(produtos) {
        const id_prod = { id_prod: produtos.id_prod }
        fetch(ipBackend + 'produto',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id_prod)
            }).then((resposta) => {
                if (resposta.ok) {
                    alert("Produto excluído com sucesso!")
                }
                else {
                    alert("Não foi possível excluir o produto.")
                }
            });
    }

    function prepararAtualizacao(consumos) {
        setConsumo(CONSUMO.atualizar);
        setAtualizaConsumo(consumos);
    }

    function prepaparAtualizacaoProduto(produtos) {
        setConsumo(CONSUMO.atualizarProduto);
        setAtualizaProduto(produtos);
    }

    function prepararRemocao(consumos) {
        apagarConsumo(consumos);
        setConsumo(CONSUMO.listagem);
    }

    function prepararRemocaoProduto(produtos) {
        apagarProduto(produtos);
        setConsumo(CONSUMO.listarProduto);
    }

    if (consumo === CONSUMO.listagem) {
        return (
            <div>
                <MenuAtendente />
                <Cabecalho titulopagina="GERENCIAR CONSUMOS" />
                <TabelaConsumos exibirConsumo={setConsumo}
                    dadosConsumos={listaConsumos}
                    editarConsumos={prepararAtualizacao}
                    apagarConsumos={prepararRemocao}
                    dadosNome={setBuscaNome}
                    escolheBusca={setBusca} 
                    modoBuscar={setModoBusca}/>
                <RodapeLogado />
            </div>
        );
    }

    else if (consumo === CONSUMO.cadastro) {
        return (
            <div>
                <MenuAtendente />
                <Cabecalho titulopagina="CADASTRAR CONSUMO" />
                <FormCADConsumo exibirConsumo={setConsumo} 
                                escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (consumo === CONSUMO.atualizar) {
        return (
            <div>
                <MenuAtendente />
                <Cabecalho titulopagina="ATUALIZAR CONSUMO" />
                <FormATUConsumo exibirConsumo={setConsumo} 
                                listaConsumo={atualizaConsumo} 
                                escolheBusca={setBusca} />
                <RodapeLogado />
            </div>
        );
    }

    else if (consumo === CONSUMO.cadastroProduto) {
        return (
            <div>
                <MenuAtendente />
                <Cabecalho titulopagina="CADASTRAR PRODUTO" />
                <FormCADProduto exibirConsumo={setConsumo}/>
                <RodapeLogado />
            </div>
        )
    }

    else if (consumo === CONSUMO.atualizarProduto) {
        return (
            <div>
                <MenuAtendente />
                <Cabecalho titulopagina="ATUALIZAR PRODUTO" />
                <FormCADProduto atualizaProduto={atualizaProduto}
                                exeAtualizaçãoProduto={atualizarProdutos}
                                exibirConsumo={setConsumo}
                                botaoSubmit="Atualizar"/>
                <RodapeLogado />
            </div>
        )
    }

    else if (consumo === CONSUMO.listarProduto) {
        return (
            <div>
                <MenuAtendente />
                <Cabecalho titulopagina="LISTAR PRODUTOS CADASTRADOS"/>
                <TabelaProdutos exibirConsumo={setConsumo}
                                apagarProduto={prepararRemocaoProduto}
                                exeAtualizaProduto={prepaparAtualizacaoProduto}
                                dadoProduto={dadosProdutos}
                                dadosNome={setBuscaNome}
                                escolheBusca={setBusca} 
                                modoBuscar={setModoBusca}/>
                <RodapeLogado />
            </div>
        )
    }
}