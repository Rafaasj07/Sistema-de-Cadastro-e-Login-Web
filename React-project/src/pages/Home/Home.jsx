// --- IMPORTAÇÕES ---
import { useState, useEffect } from 'react';
import './styleHome.css';
import logoIcone from '../../assets/icone.png';
import Login from '../Login/Login';
import Cadastro from '../Cadastro/Cadastro';

// --- COMPONENTE Home ---
// Página principal que permite ao usuário escolher um perfil (usuário ou adm)
// e alternar entre os formulários de Login e Cadastro.
function Home() {
    // --- ESTADOS ---
    const [perfilAtivo, setPerfilAtivo] = useState('usuario'); // Controla o perfil ativo.
    const [mostrarFormulario, setMostrarFormulario] = useState('login'); // Controla qual formulário é exibido.

    // --- EFEITO: Define o perfil inicial ao carregar a página. ---
    useEffect(() => {
        // Usa o perfil do localStorage se existir, senão define 'usuario' como padrão.
        const perfilSalvo = localStorage.getItem('perfil');
        if (perfilSalvo) {
            setPerfilAtivo(perfilSalvo);
        } else {
            localStorage.setItem('perfil', 'usuario');
        }
    }, []);

    // --- FUNÇÃO DE CONTROLE ---
    // Atualiza o perfil no estado e no localStorage quando um botão é clicado.
    const selecionarPerfil = (perfil) => {
        localStorage.setItem('perfil', perfil);
        setPerfilAtivo(perfil);
    };

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerHome'>
            {/* Barra de navegação com título e seleção de perfil. */}
            <nav className='navHome'>
                <div className='logoTituloHome'>
                    <img src={logoIcone} alt="Logo do sistema" className="logoHome" />
                    <h1 id='h1Home'>Sistema de Cadastro e Login</h1>
                </div>
                <div className='direita-nav'>
                    <div className='containerH2'><h2>Escolha um Perfil: </h2></div>
                    <div className='botoesHome'>
                        <button type='button' className={perfilAtivo === 'usuario' ? 'active' : ''} onClick={() => selecionarPerfil('usuario')}>Usuário</button>
                        <button type='button' className={perfilAtivo === 'adm' ? 'active' : ''} onClick={() => selecionarPerfil('adm')}>Adm</button>
                    </div>
                </div>
            </nav>

            {/* Renderiza o formulário de Login ou Cadastro condicionalmente. */}
            {mostrarFormulario === 'login' ? (
                <Login onNavigateToCadastro={() => setMostrarFormulario('cadastro')} />
            ) : (
                <Cadastro onNavigateToLogin={() => setMostrarFormulario('login')} />
            )}
        </div>
    );
}

export default Home;