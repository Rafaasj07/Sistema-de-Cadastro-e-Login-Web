// --- IMPORTAÇÕES ---
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './styleCadastro.css';

// --- COMPONENTE Cadastro ---
// Primeira etapa do formulário de cadastro.
function Cadastro({ onNavigateToLogin }) {
    // --- HOOKS e ESTADOS ---
    const navegar = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [emailsCadastrados, setEmailsCadastrados] = useState([]);
    const perfil = localStorage.getItem('perfil') || 'usuario';

    // --- EFEITO: Busca e-mails existentes na montagem do componente. ---
    useEffect(() => {
        async function fetchEmails() {
            try {
                const response = await api.get('/usuarios');
                const emails = response.data.map(usuario => usuario.email);
                setEmailsCadastrados(emails);
            } catch (error) {
                console.error("Erro ao buscar usuários existentes:", error);
            }
        }
        fetchEmails();
    }, []);

    // --- FUNÇÕES ---
    // Limpa as mensagens de feedback.
    function limparFeedback() {
        setMensagem('');
        setHasError(false);
    }

    // Lida com o envio do formulário para a próxima etapa.
    async function proximaEtapa(e) {
        e.preventDefault();
        limparFeedback();
        // Validação de e-mail duplicado no lado do cliente.
        if (emailsCadastrados.includes(email)) {
            setMensagem('Este e-mail já está em uso.');
            setHasError(true);
            return;
        }
        setIsLoading(true);
        try {
            // Envia os dados iniciais para a API.
            const response = await api.post('/usuarios', { nome, senha, email, perfil });
            const novoUsuario = response.data;
            // Navega para a segunda etapa do cadastro com o ID do novo usuário.
            navegar(`/Cadastro2/${novoUsuario.id}`);
        } catch (error) {
            setHasError(true);
            setMensagem(error.response?.data?.mensagem || 'Ocorreu um erro inesperado.');
        } finally {
            setIsLoading(false);
        }
    }

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerCadastro'>
            <form className='formCadastro' onSubmit={proximaEtapa}>
                <h1 id='h1Cadastro'>Cadastro</h1>
                {/* Inputs para nome, email e senha. */}
                <div className='inputBox'>
                    <input placeholder='Nome' name='nome' type='text' required value={nome} onChange={(e) => setNome(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-user'></i>
                </div>
                <div className='inputBox'>
                    <input placeholder='Email' name='email' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-envelope'></i>
                </div>
                <div className='inputBox'>
                    <input placeholder='Senha' name='senha' type='password' required value={senha} onChange={(e) => setSenha(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                {/* Botão de submissão. */}
                <button id='butaoCadastro' type='submit' disabled={isLoading}>
                    {isLoading ? 'Aguarde...' : 'Próximo'}
                </button>
                <div className="form-spacer"></div>
                {/* Exibição de mensagens de erro. */}
                <div className="mensagem-feedback-container">
                    {mensagem && <p className='mensagem-erro-cadastro'>{mensagem}</p>}
                </div>
                {/* Link para a página de login. */}
                <div className='loginLink'>
                    <p>Já tem uma conta? <a onClick={onNavigateToLogin}>Faça o login</a></p>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;