// --- IMPORTAÇÕES ---
// Importa dependências do React Router e os estilos da página.
import { useNavigate } from 'react-router-dom';
import './styleAcessoUsuario.css';
import NavPadrao from '../NavPadrao/NavPadrao';

// --- COMPONENTE AcessoUsuario ---
// Página de confirmação exibida após um login de usuário bem-sucedido.
function AcessoUsuario() {
    // --- HOOKS ---
    const navegar = useNavigate();

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerAcesso'>
            {/* Barra de navegação padrão. */}
            <NavPadrao />

            {/* Conteúdo principal da página. */}
            <main className="conteudoAcesso">
                <div className="icone-sucesso">✓</div>
                <h1 className='acessoH1'>Acesso Liberado!</h1>
                <p className="acesso-subtitulo">Parabéns por fazer login em nosso sistema.</p>
                {/* Botão para voltar à página inicial. */}
                <button type='button' className="botao-home" onClick={() => navegar('/home')}>
                    Voltar para a Home
                </button>
            </main>

            {/* Rodapé com informações do desenvolvedor. */}
            <footer className="footer-acesso">
                <p className="footer-desenvolvido">Desenvolvido por Rafael Augusto</p>
                <div className="footer-links">
                    <a href="https://github.com/rafaasj07" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                    <a href="https://instagram.com/rafael_asj7" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
                </div>
            </footer>
        </div>
    );
}

export default AcessoUsuario;