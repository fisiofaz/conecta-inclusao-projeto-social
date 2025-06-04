import React from 'react';

function HomePage() {
  return (
    <div>
      <h2>Bem-vindo ao Conecta Inclusão!</h2>
      <p>O Hub de Inclusão para Pessoas com Deficiência.</p>
      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Cadastre-se</a></li>
          <li><a href="/opportunities">Ver Oportunidades</a></li>
          <li><a href="/complaints">Ver Denúncias</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;