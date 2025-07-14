// --- IMPORTAÇÕES ---
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styleMudarSenha.css';
import api from '../../services/api';
import NavPadrao from '../NavPadrao/NavPadrao';

// --- COMPONENTE MudarSenha ---
// Permite ao usuário definir uma nova senha.
function MudarSenha() {
    // --- HOOKS e ESTADOS ---
    const navegar = useNavigate();
    const { id } = useParams(); // Pega o ID do usuário da URL.
    const [senha1, setSenha1] = useState('');
    const [senha2, setSenha2] = useState(''); // Estado para confirmação da senha.
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // --- FUNÇÕES ---
    // Limpa as mensagens de feedback.
    function limparFeedback() {
        setMensagem('');
        setHasError(false);
        setIsSuccess(false);
    }

    // Lida com o envio do formulário para alterar a senha.
    async function submitAlterarSenha(e) {
        e.preventDefault();
        limparFeedback();
        // Valida se as senhas coincidem.
        if (senha1 !== senha2) {
            setMensagem('As senhas não coincidem.');
            setHasError(true);
            return;
        }
        setIsLoading(true);
        try {
            // Envia a nova senha para a API.
            await api.post('/mudarSenha', { id, NovaSenha: senha1 });
            setIsSuccess(true);
            setMensagem('Senha alterada com sucesso! Redirecionando...');
            navegar('/home'); // Redireciona para a home.
        } catch (error) {
            setHasError(true);
            setMensagem(error.response?.data?.mensagem || 'Ocorreu um erro.');
            setIsLoading(false);
        }
    }

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerMudarSenha'>
            <NavPadrao />
            <form className='formMudarSenha' onSubmit={submitAlterarSenha}>
                <h1 id='h1MudarSenha'>Mudar Senha</h1>
                {/* Inputs para nova senha e confirmação. */}
                <div className='inputBox'>
                    <input placeholder='Nova Senha' type='password' required value={senha1} onChange={e => setSenha1(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className='inputBox'>
                    <input placeholder='Confirmar Senha' type='password' required value={senha2} onChange={e => setSenha2(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                {/* Exibição de mensagens de feedback. */}
                <div className="mensagem-feedback-container">
                    {mensagem && <p className={isSuccess ? 'mensagem-sucesso' : 'mensagem-erro'}>{mensagem}</p>}
                </div>
                <div className="form-spacer"></div>
                {/* Botão de confirmação. */}
                <button id='butaoMudarSenha' type="submit" disabled={isLoading}>
                    {isLoading ? 'Alterando...' : 'Confirmar'}
                </button>
            </form>
        </div>
    );
}

export default MudarSenha;