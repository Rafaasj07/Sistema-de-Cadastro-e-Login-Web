// --- IMPORTAÇÕES ---
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './styleRecuperarSenha.css';
import NavPadrao from '../NavPadrao/NavPadrao';

// --- COMPONENTE RecuperarSenha ---
// Primeira etapa da recuperação de senha, onde o usuário digita o e-mail.
function RecuperarSenha() {
    // --- HOOKS e ESTADOS ---
    const navegar = useNavigate();
    const [tentativaEmail, setTentativaEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [hasError, setHasError] = useState(false);

    // --- FUNÇÕES ---
    // Limpa as mensagens de feedback.
    function limparFeedback() {
        setMensagem('');
        setIsSuccess(false);
        setHasError(false);
    }

    // Busca o e-mail na API para prosseguir com a recuperação.
    async function buscaEmail(e) {
        e.preventDefault();
        limparFeedback();
        setIsLoading(true);
        try {
            // Envia o e-mail para a API.
            const resposta = await api.post('/buscaUsuario', { tentativaEmail });
            const { sucesso, id, pergunta } = resposta.data;
            if (sucesso) {
                setIsSuccess(true);
                setMensagem('Usuário encontrado! Redirecionando...');
                // Salva a pergunta secreta no localStorage para a próxima etapa.
                localStorage.setItem('pergunta', pergunta);
                // Navega para a tela da pergunta secreta.
                navegar(`/PerguntaSecreta/${id}`);
            }
        } catch (error) {
            setHasError(true);
            setMensagem(error.response?.data?.mensagem || 'Usuário não encontrado.');
            setIsLoading(false);
        }
    }

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerRecpSenha'>
            <NavPadrao />
            <form className='formRecpSenha' onSubmit={buscaEmail}>
                <h1 id='h1RecpSenha'>Recuperar Senha</h1>
                <p className="mensagem-instrucao">Digite seu e-mail para continuar</p>
                {/* Input para o e-mail. */}
                <div className='inputBox'>
                    <input placeholder='Email' type='email' required value={tentativaEmail} onChange={e => setTentativaEmail(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-envelope'></i>
                </div>
                {/* Botão de confirmação. */}
                <button id='butaoRecpSenha' type='submit' disabled={isLoading}>
                    {isLoading ? 'Confirmando...' : 'Confirmar'}
                </button>
                {/* Exibição de mensagens de feedback. */}
                {mensagem && <p className={isSuccess ? "mensagem-sucessoRS" : "mensagem-erroRS"}>{mensagem}</p>}
            </form>
        </div>
    );
}

export default RecuperarSenha;