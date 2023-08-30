'use client'
import Cabecalho from './componentes/templates/Cabecalho.js'
import Rodape from './componentes/templates/Rodape.js'
import HomeSection from './componentes/templates/Home.js'
import LOGIN from './componentes/estados/useLogin.js'
import { useState } from 'react'
import PERMISSAO from './componentes/estados/usePermissao.js'


export default function Home() {

  const [Login, setLogin] = useState(LOGIN.deslogado);
  const [Permissao, setPermissao] = useState(PERMISSAO.noaccess)

  if (Login === LOGIN.deslogado) {
    return (
      <main>
        <Cabecalho />
        <HomeSection estadoLogin={setLogin} estadoPermissao={setPermissao}/>
        <Rodape />
      </main>
    )
  }
  
  else if (Login === LOGIN.logado && Permissao === PERMISSAO.gerente) {
    return (
        window.location.href="/hospede"
    )
  }

  else if (Login === LOGIN.logado && Permissao === PERMISSAO.atendente) {
    return (
        window.location.href="/hospede"
    )
  }

  else if (Login === LOGIN.logado && Permissao === PERMISSAO.auxiliar) {
    return (
        window.location.href="/governanca"
    )
  }

  else if (Login === LOGIN.logado && Permissao === PERMISSAO.hospede) {
    return (
        window.location.href="/reserva"
    )
  }
}
