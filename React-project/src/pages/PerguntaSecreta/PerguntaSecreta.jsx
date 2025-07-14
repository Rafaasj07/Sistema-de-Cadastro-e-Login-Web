// --- IMPORTAÇÕES ---
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './stylePerguntaSecreta.css';
import NavPadrao from '../NavPadrao/NavPadrao';

// --- COMPONENTE PerguntaSecreta ---
// Exibe a pergunta de segurança e valida a resposta do usuário.
function PerguntaSecreta() {
    // --- HOOKS e ESTADOS ---
    const navegar = useNavigate();
    const { id } = useParams(); // Pega o ID do usuário da URL.
    const [pergunta, setPergunta] = useState('');
    const [tentativaResposta, setTentativaResposta] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [hasError, setHasError] = useState(false);

    // --- EFEITO: Busca a pergunta secreta do localStorage ao carregar. ---
    useEffect(() => {
        const perguntaSalva = localStorage.getItem('pergunta');
        if (perguntaSalva) {
            setPergunta(perguntaSalva);
        } else {
            // Se não encontrar, redireciona para a primeira etapa.
            navegar('/RecuperarSenha');
        }
    }, [navegar]);

    // --- FUNÇÕES ---
    // Limpa as mensagens de feedback.
    function limparFeedback() {
        setMensagem('');
        setIsSuccess(false);
        setHasError(false);
    }

    // Verifica se a resposta está correta.
    async function verificarResposta(e) {
        e.preventDefault();
        limparFeedback();
        if (!tentativaResposta) { /* Validação simples. */
            setMensagem("Por favor, preencha a sua resposta.");
            setHasError(true);
            return;
        }
        setIsLoading(true);
        try {
            // Envia a resposta para a API para verificação.
            const respostaApi = await api.post('/verificar-resposta', { id, tentativaResposta });
            if (respostaApi.data.sucesso) {
                // Se correta, navega para a página de alteração de senha.
                setIsSuccess(true);
                setMensagem('Resposta correta! Redirecionando...');
                navegar(`/MudarSenha/${id}`);
            }
        } catch (error) {
            setHasError(true);
            setMensagem(error.response?.data?.mensagem || 'Ocorreu um erro.');
            setIsLoading(false);
        }
    }

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerPerguntaSecreta'>
            <NavPadrao />
            <form className='formPerguntaSecreta' onSubmit={verificarResposta}>
                <h1 id='h1PerguntaSecreta'>Pergunta Secreta</h1>
                {/* Exibe a pergunta e o campo para a resposta. */}
                <p className='pergunta-exibida'>{pergunta || "Carregando..."}</p>
                <div className='inputBox'>
                    <input placeholder='Sua Resposta Secreta' name='resposta' type='text' required value={tentativaResposta} onChange={(e) => setTentativaResposta(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-key'></i>
                </div>
                {/* Exibe mensagens de feedback. */}
                <div className="mensagem-feedback-container">
                    {mensagem && <p className={isSuccess ? "mensagem-sucesso" : "mensagem-erro"}>{mensagem}</p>}
                </div>
                <div className="form-spacer"></div>
                {/* Botão de confirmação. */}
                <button id='butaoConfirma' type='submit' disabled={isLoading}>
                    {isLoading ? 'Verificando...' : 'Confirmar Resposta'}
                </button>
            </form>
        </div>
    );
}

export default PerguntaSecreta;