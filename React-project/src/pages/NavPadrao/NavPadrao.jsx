// --- IMPORTAÇÕES ---
import './styleNavPadrao.css';
import logoIcone from '../../assets/icone.png';
import { useNavigate } from 'react-router-dom';

// --- COMPONENTE NavPadrao ---
// Barra de navegação reutilizável com logo, título e um botão "Home".
function NavPadrao({ homeButtonDisabled = false }) {
    // --- HOOKS ---
    const navegar = useNavigate();

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerPadrao'>
            <nav className='navPadrao'>
                {/* Logo e título. */}
                <div className='logoTituloPadrao'>
                    <img src={logoIcone} alt="Logo do sistema" className="logoPadrao" />
                    <h1 id='h1Home'>Sistema de Cadastro e Login</h1>
                </div>
                {/* Botão para navegar para a Home. */}
                <div className='botaoNav'>
                    <button type="button" onClick={() => navegar('/Home')} disabled={homeButtonDisabled}>
                        Home
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default NavPadrao;