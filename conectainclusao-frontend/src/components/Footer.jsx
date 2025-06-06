import React from 'react';
import { Link } from 'react-router-dom'; 

function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="bg-gray-800 text-white py-8 px-6 mt-10"> 
      <div className="container mx-auto flex flex-wrap justify-between items-center text-center md:text-left"> 
        
        <div className="w-full md:w-1/3 mb-6 md:mb-0"> 
          <h3 className="text-xl font-bold text-blue-400 mb-2">Conecta Inclusão</h3> 
          <p className="text-sm text-gray-400">© {currentYear} Todos os direitos reservados.</p> 
        </div>

        {/* Seção de Links Rápidos (Exemplo) */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-3">Links Rápidos</h3> 
          <ul className="space-y-2"> 
            <li><Link to="/opportunities" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Oportunidades</Link></li>
            <li><Link to="/complaints" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Denúncias</Link></li>
            <li><Link to="/health-resources" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Saúde & Bem-Estar</Link></li>
            
          </ul>
        </div>

        {/* Seção de Contato/Redes Sociais (Exemplo) */}
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-3">Contato</h3>
          <p className="text-sm text-gray-300">Email: contato@conectainclusao.com</p>
          <p className="text-sm text-gray-300">Telefone: (XX) XXXX-XXXX</p>
          
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
         
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <i className="fab fa-facebook"></i> 
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;