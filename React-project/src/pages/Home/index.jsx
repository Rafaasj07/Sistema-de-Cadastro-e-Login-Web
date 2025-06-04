import { useEffect, useState, useRef } from 'react' // São Hooks do React
import './style.css'
import Lixeira from '../../assets/lixeira.svg'
import api from '../../services/api'
function Home() {

  // Hook de estado que cria a variável 'usuarios' e a função 'setUsuarios' para atualizá-la.
  // Inicialmente, 'usuarios' é um array vazio.
  // O React exige o uso de useState para que, ao atualizar a variável, o componente seja renderizado novamente corretamente.
  const [usuarios, setUsuarios] = useState([])

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  // Função assíncrona que faz uma requisição GET para buscar os usuários da API.
  async function listar_usuarios() {
    const response = await api.get('/usuarios') // Aguarda a resposta da API com os dados dos usuários
    setUsuarios(response.data) // Atualiza o estado com os usuários recebidos da API
  }

  // Cria um usuario no meu servidor
  async function criar_usuarios() {
    await api.post('/usuarios', { // Aguarda a resposta da API com os dados dos usuários
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    }) 
    listar_usuarios()
  }

  // Apaga um usuario do meu server
  async function excluir_usuarios(id) {
     await api.delete(`/usuarios/${id}`)
     listar_usuarios()
  }
  // Hook useEffect que executa o código dentro dele quando o componente for montado pela primeira vez.
  // O array vazio [] como segundo argumento indica que esse efeito roda **somente uma vez**, na montagem inicial. Ou seja,
  // useEffect() garante que tudo vai ser listado quando eu carregar minha página.
  useEffect(() => {
    listar_usuarios() // Chama a função que busca os usuários
  }, [])


  return (
    <div className='container'> {/* Div é padrão é agrupa elementos, organiza para estilizar...  */}
      <form className='form_cadastro'> {/* Form é contêiner que organiza os campos para o usuário preencher  */}
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputNome}></input> {/* Campo onde o usuário envia informações  */}
        <input placeholder='Idade' name='idade' type='number' ref={inputIdade}></input>  {/* Type define o comportamento do meu campo, ele já barra automaticamente algo diferente*/}
        <input placeholder='Email' name='email' type='email' ref={inputEmail}></input>
        <button id='butão_cadastro' type='button' onClick={criar_usuarios}>Cadastrar</button>
      </form>

      {
        usuarios.map((usuario) => (
          <div key={usuario.id} className='card'>
            <div>
              <p>Nome:  <span>{usuario.nome}</span></p>
              <p>Idade: <span>{usuario.idade}</span></p>
              <p>Email: <span>{usuario.email}</span></p>
            </div>
            <button><img src={Lixeira} onClick={() => excluir_usuarios(usuario.id)}></img></button>
          </div>
        ))
      }

    </div>

  )
}

export default Home