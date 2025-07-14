// --- IMPORTAÇÕES ---
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lixeira from '../../assets/lixeira.svg';
import api from '../../services/api';
import './styleFuncoesAdm.css';
import logoIcone from '../../assets/icone.png';

// --- COMPONENTE FuncoesAdm ---
// Página de gerenciamento de usuários para o administrador.
function FuncoesAdm() {
    // --- HOOKS e ESTADOS ---
    const navegar = useNavigate();
    const [usuarios, setUsuarios] = useState([]); // Lista de usuários.
    const [nome, setNome] = useState(''); // Valor do campo de busca.
    const [selecionado, setSelecionado] = useState(false); // Estado do checkbox "Ver Todos".

    // --- FUNÇÕES DE API ---
    // Busca todos os usuários.
    async function listar_todos_usuarios() {
        const response = await api.get('/usuarios');
        setUsuarios(response.data);
    }

    // Busca usuários por nome.
    async function procurar_usuario_por_nome(e) {
        e.preventDefault();
        setSelecionado(false);
        const response = await api.get(nome ? `/usuarios?nome=${nome}` : '/usuarios');
        setUsuarios(response.data);
    }

    // Exclui um usuário.
    async function excluir_usuarios(id) {
        await api.delete(`/usuarios/${id}`);
        // Atualiza a lista após a exclusão.
        if (selecionado) {
            listar_todos_usuarios();
        } else {
            setUsuarios(prev => prev.filter(u => u.id !== id));
        }
    }

    // --- FUNÇÕES DE EVENTO ---
    // Lida com a mudança do checkbox "Ver Todos".
    async function handleSelecaoChange(isChecked) {
        setSelecionado(isChecked);
        if (isChecked) {
            await listar_todos_usuarios();
        } else {
            setUsuarios([]);
        }
    }

    // --- RENDERIZAÇÃO ---
    return (
        <div className='pagina-funcoes-adm'>
            {/* Barra de Navegação com busca e botão Home. */}
            <nav className="barra-navegacao">
                <form className="formulario-busca" onSubmit={procurar_usuario_por_nome}>
                    <input className="campo-busca" placeholder='Nome' type='text' value={nome} onChange={e => setNome(e.target.value)} />
                    <button className="botao-busca" type="submit">Buscar</button>
                    <div className="selecao-todos-users">
                        <input id="checkbox-customizado" type="checkbox" checked={selecionado} onChange={(e) => handleSelecaoChange(e.target.checked)} />
                        <label htmlFor="checkbox-customizado" className="label-customizada">Ver Todos</label>
                    </div>
                </form>
                <div className='botoes-fun-adm'>
                    <button type="button" onClick={() => navegar('/Home')}>Home</button>
                </div>
                <img src={logoIcone} alt="Logo do sistema" className="logo-adm" />
            </nav>

            {/* Container para os cards de usuário. */}
            <main className='card-geral'>
                {/* Mapeia e exibe cada usuário em um card. */}
                {usuarios.map((usuario) => (
                    <div key={usuario.id} className='card'>
                        <div>
                            <p>Nome: <span>{usuario.nome}</span></p>
                            <p>Email: <span>{usuario.email}</span></p>
                            <p>Perfil: <span>{usuario.perfil}</span></p>
                        </div>
                        {/* Botão para excluir o usuário. */}
                        <button onClick={() => excluir_usuarios(usuario.id)}>
                            <img src={Lixeira} alt="Excluir" />
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default FuncoesAdm;