'use client'
import Cabecalho from './componentes/templates/Cabecalho.js'
import Rodape from './componentes/templates/Rodape.js'
import HomeSection from './componentes/templates/Home.js'
import LOGIN from './componentes/estados/useLogin.js'
import { useState } from 'react'
import PERMISSAO from './componentes/estados/usePermissao.js'
import CADCliente from './componentes/formularios/Clientes.js'
import CLIENTES from './componentes/estados/useClientes.js'
import ipBackend from './componentes/IPBackend.js'
import alertaErro from './componentes/alertas/Erro.js'
import confirmaGravação from './componentes/alertas/Gravacao.js'


export default function Home() {

  const [Login, setLogin] = useState(LOGIN.deslogado);
  const [Permissao, setPermissao] = useState(PERMISSAO.noaccess)


  function cadastrarCliente(dados) { /* FUNÇÃO QUE É EXECUTADA AO CADASTRAR UM CLIENTE, ONDE RECEBE O JSON VINDO DA PAGINA DE CADASTRO */
    fetch(ipBackend + "cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    }).then((resposta) => {
      return resposta.json();
    }).then((confirmacao) => {
      confirmaGravação(confirmacao);
      setLogin(LOGIN.deslogado);
    }).catch((erro) => {
      alertaErro(erro);
      setLogin(LOGIN.deslogado);
    });
  }

  function gambiarraBoa() {
    if (CLIENTES.listcliente) {
      setLogin(LOGIN.deslogado)
    }
  }

  if (Login === LOGIN.deslogado) {
    return (
      <div>
        <Cabecalho />
        <HomeSection estadoLogin={setLogin} estadoPermissao={setPermissao} />
        <Rodape />
      </div>
    )
  }

  else if (Login === LOGIN.logado && Permissao === PERMISSAO.gerente) {
    return (
      window.location.href = "/gerentes"
    )
  }

  else if (Login === LOGIN.logado && Permissao === PERMISSAO.atendente) {
    return (
      window.location.href = "/atendentes"
    )
  }

  else if (Login === LOGIN.logado && Permissao === PERMISSAO.auxiliar) {
    return (
      window.location.href = "/auxiliares"
    )
  }

  else if (Login === LOGIN.logado && Permissao === PERMISSAO.hospede) {
    return (
      window.location.href = "/hospedes"
    )
  }

  else if (Login === LOGIN.cadastrar) {
    return (
      <div>
        <Cabecalho />
        <CADCliente cadastraCli={cadastrarCliente}
          mudaCliente={gambiarraBoa} />
        <Rodape />
      </div>
    )
  }
}
