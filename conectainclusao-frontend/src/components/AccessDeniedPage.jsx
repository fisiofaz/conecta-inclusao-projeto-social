import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function AccessDeniedPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
      {/* Animação do container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl"
      >
        {/* Ícone animado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="flex justify-center mb-4"
        >
          <ShieldAlert className="w-16 h-16 text-red-500" />
        </motion.div>

        {/* Título e mensagem */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-2xl font-bold text-gray-800"
        >
          Acesso Negado
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 leading-relaxed text-gray-600"
        >
          Você não tem permissão para acessar esta página.  
          Caso acredite que isso é um erro, entre em contato com o administrador do sistema.
        </motion.p>

        {/* Botões de ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-gray-800 transition bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Voltar
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            Ir para o Dashboard
          </button>

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-white transition bg-green-600 rounded-xl hover:bg-green-700"
            >
              Fazer Login
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AccessDeniedPage;
