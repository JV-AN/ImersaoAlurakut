import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
     
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'jv-an';
  const [comunidades, setComunidade] = React.useState([{
    id: '12314',
    title: 'Alurabook',
    link: 'https://www.facebook.com/',
    image: 'https://scontent.fcgh10-1.fna.fbcdn.net/v/t1.6435-9/58978307_2720391837988563_2362113514652303360_n.png?_nc_cat=1&ccb=1-3&_nc_sid=973b4a&_nc_ohc=hrQu1d5oMykAX84NURa&_nc_ht=scontent.fcgh10-1.fna&oh=d4384165d131ec8cf47b2473ff662f55&oe=60F3B65C'
  },{
    id: '123145',
    title: 'Amamos o sotaque do Nico',
    link: 'https://github.com/steppat',
    image: 'https://github.com/steppat.png'
  }]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'steppat'
  ]


  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {usuarioAleatorio}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="smallTitle">Oque deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString,
                title: dadosForm.get('title'),
                link: dadosForm.get('link'),
                image: dadosForm.get('image')
              }


              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidade(comunidadesAtualizadas); 
            }}>
              <div>
                <input
                  type="text"
                  placeholder="Qual o nome da comunidade que deseja inserir?"
                  name="title"
                  aria-label="Qual o nome da comunidade que deseja inserir?"
                />
              </div>
              <div>
                <input
                  placeholder="Link relacionado á comunidade"
                  aria-label="Link relacionado á comunidade"
                  name="link"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Insira o URL da imagem de capa ( ou deixe em branco p/ uma imagem aleatória)"
                  aria-label="Insira o URL da imagem de capa ( ou deixe em branco p/ uma imagem aleatória)"
                  name="image"
                />
              </div>
              <button >Cria Comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
              const cmpLinkVazio = itemAtual.link === '' ? itemAtual.title : itemAtual.link;
              const cmpImageVazio = itemAtual.image === '' ? 'https://picsum.photos/200/300' : itemAtual.image;
                return (comunidades.length > 6 ? (
                 false
                ):  <li key={itemAtual.id}>
                <a href={cmpLinkVazio} >
                <img src={cmpImageVazio} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>)
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}