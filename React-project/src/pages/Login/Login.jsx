// --- IMPORTAÇÕES ---
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleLogin.css';
import api from '../../services/api';

// --- COMPONENTE Login ---
// Formulário de login que lida com a autenticação do usuário.
function Login({ onNavigateToCadastro }) {
    // --- HOOKS e ESTADOS ---
    const navegar = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [lembrarEmail, setLembrarEmail] = useState(false); // Checkbox "Lembrar email".
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // --- EFEITO: Carrega o e-mail salvo do localStorage na montagem. ---
    useEffect(() => {
        const emailSalvo = localStorage.getItem('emailSalvo');
        if (emailSalvo) {
            setEmail(emailSalvo);
            setLembrarEmail(true);
        }
    }, []);

    // --- FUNÇÃO DE LOGIN ---
    async function fazerLogin(e) {
        e.preventDefault();
        limparFeedback();
        setIsLoading(true);
        try {
            // Verifica qual perfil (usuário/adm) está selecionado.
            const perfilEsperado = localStorage.getItem('perfil');
            // Envia os dados para a API de login.
            const response = await api.post('/login', { email, senha });
            const { sucesso, perfil: perfilReal, id } = response.data;
            if (sucesso) {
                localStorage.setItem('userId', id);
                // Salva ou remove o e-mail do localStorage.
                if (lembrarEmail) {
                    localStorage.setItem('emailSalvo', email);
                } else {
                    localStorage.removeItem('emailSalvo');
                }
                // Redireciona com base no perfil correto.
                if (perfilReal === perfilEsperado) {
                    navegar(perfilReal === 'adm' ? '/FuncoesAdm' : '/AcessoUsuario');
                } else {
                    setHasError(true);
                    setMensagem('Credenciais para o perfil errado.');
                }
            } else {
                setHasError(true);
                setMensagem(response.data.mensagem || 'Ocorreu um erro inesperado.');
            }
        } catch (error) {
            setHasError(true);
            setMensagem(error.response?.data?.mensagem || 'Email ou senha inválidos.');
        } finally {
            setIsLoading(false);
        }
    }

    // Limpa as mensagens de feedback.
    function limparFeedback() {
        setMensagem('');
        setHasError(false);
    }

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerLogin'>
            <form className='formLogin' onSubmit={fazerLogin}>
                <h1 id='h1Login'>Login</h1>
                {/* Inputs para email e senha. */}
                <div className='inputBox'>
                    <input placeholder='Email' name='email' type='email' required value={email} onChange={e => setEmail(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} autoComplete='email' />
                    <i className='bx bxs-user'></i>
                </div>
                <div className='inputBox'>
                    <input placeholder='Senha' name='password' type='password' required value={senha} onChange={e => setSenha(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} autoComplete='current-password' />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                {/* Opções de "Lembrar email" e "Esqueci a senha". */}
                <div className='lembrarSenha'>
                    <label>
                        <input type='checkbox' checked={lembrarEmail} onChange={e => setLembrarEmail(e.target.checked)} />
                        Lembrar email
                    </label>
                    <a onClick={() => navegar('/RecuperarSenha')}>Esqueci a senha</a>
                </div>
                {/* Botão de submissão. */}
                <button type="submit" className='loginBotao' disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
                {/* Link para o formulário de Cadastro. */}
                <div className='cadastroLink'>
                    <p>Não tem uma conta? <a onClick={onNavigateToCadastro}>Cadastre-se</a></p>
                </div>
                <div className="form-spacer"></div>
                {/* Exibição de mensagem de erro. */}
                {mensagem && <p className='mensagem-erro'>{mensagem}</p>}
            </form>
        </div>
    );
}

export default Login;