// --- IMPORTAÇÕES ESSENCIAIS ---
// Importa o React, ReactDOM e os componentes do React Router.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// --- IMPORTAÇÃO DAS PÁGINAS ---
// Importa todos os componentes que representam as páginas da aplicação.
import Home from './pages/Home/Home';
import Cadastro from './pages/Cadastro/Cadastro';
import Cadastro2 from './pages/Cadastro2/Cadastro2';
import Login from './pages/Login/Login';
import FuncoesAdm from './pages/FuncoesAdm/FuncoesAdm';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';
import AcessoUsuario from './pages/AcessoUsuario/AcessoUsuario';
import PerguntaSecreta from './pages/PerguntaSecreta/PerguntaSecreta';
import MudarSenha from './pages/MudarSenha/MudarSenha';

// --- RENDERIZAÇÃO DA APLICAÇÃO ---
// Monta a aplicação no elemento 'root' do HTML.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Habilita o roteamento na aplicação. */}
    <BrowserRouter>
      {/* Define a área onde as rotas serão renderizadas. */}
      <Routes>
        {/* Define cada rota e o componente correspondente. */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Cadastro2/:userId" element={<Cadastro2 />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/FuncoesAdm" element={<FuncoesAdm />} />
        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
        <Route path="/AcessoUsuario" element={<AcessoUsuario />} />
        <Route path="/PerguntaSecreta/:id" element={<PerguntaSecreta />} />
        <Route path="/MudarSenha/:id" element={<MudarSenha />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);