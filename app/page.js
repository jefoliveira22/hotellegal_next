'use client'
import Cabecalho from './componentes/templates/Cabecalho.js'
import Rodape from './componentes/templates/Rodape.js'
import HomeSection from './componentes/templates/Home.js'
import LOGIN from './componentes/estados/useLogin.js'
import { useState } from 'react'


export default function Home() {

  const [Login, setLogin] = useState(LOGIN.deslogado);

  if (Login === LOGIN.deslogado) {
    return (
      <main>
        <Cabecalho />
        <HomeSection estadoLogin={setLogin} />
        <Rodape />
      </main>
    )
  }
  else if (Login === LOGIN.logado) {
    return (
        window.location.href="/hospede"
    )
  }
}
