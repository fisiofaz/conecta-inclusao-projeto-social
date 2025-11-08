import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle, ChevronDown, LogOut, LayoutDashboard, Star, FileText, ShieldAlert } from 'lucide-react';

// Função auxiliar para classes do Tailwind
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Verifica as permissões
  const isAdmin = user?.tipoPerfil === 'ROLE_ADMIN';
  const isPCD = user?.tipoPerfil === 'ROLE_USER';

  // Usa o nome real do usuário, como você sugeriu!
  const displayName = user?.nome || "Meu Perfil";

   return (
    <Menu as="div" className="relative ml-3">
      {/* O Botão que aciona o Dropdown (Mostra o nome do usuário) */}
      <div>
        <Menu.Button className="flex items-center rounded-full bg-blue-800 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 p-2 transition-colors">
          <span className="sr-only">Abrir menu do usuário</span>
          <UserCircle size={24} />
          <span className="hidden md:block mx-2 font-medium">{displayName}</span>
          <ChevronDown size={16} className="hidden md:block" />
        </Menu.Button>
      </div>

      {/* O Menu Dropdown (com transição) */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          
          {/* Links do Usuário (PCD) */}
          {isPCD && (
            <>
              <Menu.Item>
                {({ active }) => (
                  <Link to="/my-applications" className={classNames(active ? 'bg-gray-100' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-gray-700')}>
                    <FileText size={16} /> Minhas Candidaturas
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link to="/my-favorites" className={classNames(active ? 'bg-gray-100' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-gray-700')}>
                    <Star size={16} /> Meus Favoritos
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link to="/my-complaints" className={classNames(active ? 'bg-gray-100' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-gray-700')}>
                    <ShieldAlert size={16} /> Minhas Denúncias
                  </Link>
                )}
              </Menu.Item>
            </>
          )}

          {/* Links do Admin */}
          {isAdmin && (
            <>
              {/* Você pode adicionar mais links de admin aqui depois */}
              <div className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase">Painel Admin</div>
              <Menu.Item>
                {({ active }) => (
                  <Link to="/users" className={classNames(active ? 'bg-gray-100' : '', 'flex items-center gap-3 px-4 py-2 text-sm text-gray-700')}>
                    <LayoutDashboard size={16} /> Gerenciar Usuários
                  </Link>
                )}
              </Menu.Item>
            </>
          )}

          {/* Separador (se houver links acima) */}
          {(isAdmin || isPCD) && (
             <div className="border-t border-gray-100 my-1"></div>
          )}
          
          {/* Link de Logout */}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={classNames(active ? 'bg-gray-100' : '', 'w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700')}
              >
                <LogOut size={16} /> Sair
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
