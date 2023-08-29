'use client'
import Cabecalho from './componentes/templates/Cabecalho.js'
import Rodape from './componentes/templates/Rodape.js'
import HomeSection from './componentes/templates/Home.js'

export default function Home() {
  return (
    <main>
      <Cabecalho />
        <HomeSection/>
      <Rodape />
    </main>
  )
}
