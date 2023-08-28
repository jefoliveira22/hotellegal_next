import Cabecalho from './componentes/templates/Cabecalho.js'
import Rodape from './componentes/templates/Rodape.js'
import HomeSection from './componentes/templates/Home.js'
import Menu from './componentes/templates/Menu.js'

export default function Home() {
  return (
    <main>
      <Menu/>
      <Cabecalho />
        <HomeSection/>
      <Rodape />
    </main>
  )
}
