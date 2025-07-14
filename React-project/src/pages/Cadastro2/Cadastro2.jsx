// --- IMPORTAÇÕES ---
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styleCadastro2.css';
import api from '../../services/api';
import NavPadrao from '../NavPadrao/NavPadrao';

// --- COMPONENTE Cadastro2 ---
// Segunda etapa do cadastro (pergunta e resposta de segurança).
function Cadastro2() {
    // --- HOOKS e ESTADOS ---
    const navegar = useNavigate();
    const { userId } = useParams(); // Pega o ID do usuário da URL.
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // --- EFEITO: Verifica se o ID do usuário existe ao carregar a página. ---
    useEffect(() => {
        if (!userId) {
            // Se não houver ID, redireciona de volta para a primeira etapa.
            console.error("ERRO: A página Cadastro2 foi aberta sem um ID de usuário.");
            navegar('/Cadastro');
        }
    }, [userId, navegar]);

    // --- FUNÇÕES ---
    // Limpa as mensagens de feedback.
    function limparFeedback() {
        setMensagem('');
        setHasError(false);
        setIsSuccess(false);
    }

    // Finaliza o cadastro enviando a pergunta e resposta para a API.
    async function finalizarCadastro(e) {
        e.preventDefault();
        limparFeedback();
        // Validação simples.
        if (!pergunta || !resposta) {
            setMensagem('Por favor, preencha todos os campos.');
            setHasError(true);
            return;
        }
        setIsLoading(true);
        try {
            // Atualiza o usuário com a pergunta e resposta.
            await api.put(`/usuarios/${userId}`, { pergunta, resposta });
            setIsSuccess(true);
            setMensagem('Cadastro finalizado com sucesso!');
            navegar('/Home'); // Redireciona para a home.
        } catch (error) {
            setHasError(true);
            setMensagem(error.response?.data?.mensagem || 'Erro ao finalizar o cadastro.');
        } finally {
            if (!isSuccess) setIsLoading(false);
        }
    }

    // --- RENDERIZAÇÃO ---
    return (
        <div className='containerCadastro2'>
            {/* Navbar com botão 'Home' desabilitado. */}
            <NavPadrao homeButtonDisabled={true} />

            <form className='formCadastro2' onSubmit={finalizarCadastro}>
                <h1 id='h1Cadastro2'>Última Etapa</h1>
                {/* Inputs para pergunta e resposta. */}
                <div className='inputBox'>
                    <input placeholder='Crie uma pergunta secreta' name='pergunta' type='text' required value={pergunta} onChange={e => setPergunta(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} maxLength="175" />
                    <i className='bx bx-help-circle'></i>
                </div>
                <div className='inputBox'>
                    <input placeholder='Resposta da pergunta secreta' name='resposta' type='text' required value={resposta} onChange={e => setResposta(e.target.value)} onFocus={limparFeedback} className={hasError ? 'input-error' : ''} />
                    <i className='bx bxs-key'></i>
                </div>
                {/* Exibição de mensagens de feedback. */}
                {mensagem && <p id='mensagemCadastro2' className={isSuccess ? 'success' : 'error'}>{mensagem}</p>}
                <div style={{ flexGrow: 1 }}></div>
                {/* Botão de finalização. */}
                <button id='butaoCadastro2' type='submit' disabled={isLoading}>
                    {isLoading ? 'Finalizando...' : 'Finalizar Cadastro'}
                </button>
            </form>
        </div>
    );
}

export default Cadastro2;