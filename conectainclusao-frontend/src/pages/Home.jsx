import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import React, { useState } from 'react';

// Ícones que serão passados como props
import { FaUserTie, FaLaptopCode, FaRocket, FaExclamationTriangle } from "react-icons/fa";

// Importando todos os nossos componentes reutilizáveis
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";
import ScrollToTopButton from "../components/ScrollToTopButton";
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';

// Importando assets
import logo from "../assets/logo.png";
import logoMaisPrati from "../assets/logo-maisprati.png";

const heroImages = [
  "https://plenogroup.com.br/wp-content/uploads/2023/03/Inclusao-social-no-mercado-de-trabalho-scaled-e1677759283528.jpeg",
  "https://cdn.pixabay.com/photo/2017/08/02/00/49/people-2569234_1280.jpg",
  "https://teamevents-online.de/wp-content/uploads/2022/01/Teamgeist-min-scaled.jpg",
];

const featuresData = [
  {
    icon: <FaUserTie className="mx-auto mb-4 text-5xl text-indigo-600" />,
    title: "1. Cadastre-se",
    text: "Crie seu perfil e conte-nos sobre suas habilidades e sonhos.",
  },
  {
    icon: <FaLaptopCode className="mx-auto mb-4 text-5xl text-indigo-600" />,
    title: "2. Aprenda",
    text: "Tenha acesso a cursos gratuitos e trilhas de capacitação em tecnologia.",
  },
  {
    icon: <FaRocket className="mx-auto mb-4 text-5xl text-indigo-600" />,
    title: "3. Conquiste",
    text: "Candidate-se a vagas e alcance novas oportunidades profissionais.",
  },
];

const coursesData = [
    { img: "https://hermes.digitalinnovation.one/assets/diome/logo.svg", title: "DIO.me - Formação em Tecnologia", link: "https://dio.me" },
    { img: "https://www.alura.com.br/assets/img/alura-logo.svg", title: "Alura - Cursos de Programação", link: "https://alura.com.br" },
    { img: logoMaisPrati, title: "+PraTi - Formação e Inclusão", link: "https://www.maisprati.com.br/" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg", title: "Udemy - Cursos Online", link: "https://www.udemy.com/" },
];

export default function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    mensagem: ''
  });

  // Função genérica para atualizar TODOS os campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, ''); // Limpa o CEP (deixa só números)

    if (cep.length !== 8) {
      return; // Sai da função se o CEP não tiver 8 dígitos
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado. Por favor, verifique.');
      } else {
        // Sucesso! Preenche o estado com os dados do ViaCEP
        setFormData(prevState => ({
          ...prevState,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Ocorreu um erro ao buscar o CEP. Tente novamente.');
    }
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden text-gray-800 bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      {/* HERO FULLSCREEN */}
      <section className="relative w-full h-screen">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          effect="fade"
          className="w-full h-full"
        >
          {heroImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-screen">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.55]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                  <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl drop-shadow-2xl animate-fadeIn">
                    Inclusão & Tecnologia
                  </h1>
                  <p className="max-w-2xl mb-10 text-xl font-light text-gray-200 md:text-2xl">
                    Onde diversidade, aprendizado e tecnologia se unem para
                    criar novos futuros.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <Link to="/register">
                        <Button variant="primary" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg hover:scale-105 !rounded-xl !py-3 !px-10">
                            Cadastre-se Gratuitamente
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary" className="bg-transparent border border-white text-white hover:bg-white/20 hover:scale-105 !rounded-xl !py-3 !px-10">
                            Entrar
                        </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SOBRE */}
      <section className="px-6 py-24 text-gray-800 bg-white md:px-16">
        <div className="grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2">
          <img
            src={logo}
            alt="Logo da Plataforma Inclusiva"
            className="w-full max-w-sm mx-auto md:mx-0 rounded-3xl shadow-2xl hover:scale-[1.03] transition-transform duration-500 object-contain"
          />
          <div>
            <h2 className="mb-4 text-4xl font-bold text-indigo-800">
              Quem Somos
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              A <strong>Plataforma Inclusiva</strong> é um espaço dedicado a
              promover oportunidades iguais no mercado de trabalho. Conectamos
              pessoas em busca de desenvolvimento profissional a empresas
              comprometidas com a diversidade e a inclusão, oferecendo acesso
              gratuito a cursos e formações que impulsionam carreiras e
              transformam o futuro.
            </p>
            <Link to="/register">
                <Button variant="primary" className="bg-indigo-700 hover:bg-indigo-600 hover:scale-105 !rounded-xl">
                    Junte-se a nós!
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="px-6 py-24 text-center md:px-16 bg-gradient-to-b from-purple-50 via-white to-indigo-50">
        <h2 className="text-4xl font-bold text-indigo-800 mb-14">
          Como Funciona
        </h2>
        <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-3">
          {featuresData.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </section>

      {/* CURSOS E OPORTUNIDADES DESTAQUE */}
      <section className="px-6 py-24 text-center bg-white md:px-16">
        <h2 className="mb-10 text-4xl font-bold text-indigo-800">
          Cursos e Oportunidades em Destaque
        </h2>
        <Swiper
          modules={[Autoplay]}
          // Ajuste principal: quantos slides mostrar por padrão
          slidesPerView={'auto'} // 'auto' permite que o CSS do slide defina a largura
          spaceBetween={30}      // Espaçamento entre os slides
          autoplay={{ 
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Pausa o autoplay ao passar o mouse em cima
          }}
          loop={true} // Garante que o carrossel rode infinitamente
          centeredSlides={true} // Centraliza o slide ativo
          breakpoints={{
            // Para telas de tablet (>= 768px), mostrar 2 slides
            768: {
              slidesPerView: 2,
              centeredSlides: false, // Não precisa mais centralizar
            },
            // Para telas de desktop (>= 1024px), mostrar 3 slides
            1024: {
              slidesPerView: 3,
              centeredSlides: false,
            },
          }}
          className="max-w-6xl py-4 mx-auto" // Adicionado py-4 para dar um respiro
        >
        {coursesData.map((item, idx) => (
          <SwiperSlide key={idx} style={{ width: '300px' }}> {/* Define uma largura base para cada slide */}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-between h-[300px] bg-gradient-to-br from-indigo-50 to-purple-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 p-8"
            >
              <img
                src={item.img}
                alt={item.title}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Logo")}
                className="object-contain h-20 mb-6"
              />
              <h3 className="flex items-center justify-center flex-grow text-xl font-semibold text-center text-indigo-700">
                {item.title}
              </h3>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

      {/* CONTATO */}
      <section className="relative px-6 py-24 overflow-hidden text-white bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 md:px-16">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-5xl font-extrabold">Entre em Contato</h2>
          <p className="mb-10 text-lg text-gray-300">
            Tem dúvidas, ideias ou quer apoiar nosso projeto? Fale com a gente!
          </p>
          <form 
            className="grid gap-5 p-8 text-left border shadow-2xl bg-white/10 backdrop-blur-lg rounded-3xl border-white/20"
            onSubmit={(e) => {
              e.preventDefault(); // Impede o recarregamento da página
              console.log("Dados do formulário:", formData);
              alert("Formulário enviado! (Verifique o console para ver os dados)");
              // Aqui você colocaria a lógica de envio do email
            }}
          >
            {/* Campos de Nome e Email */}
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Seu e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Linha divisória */}
            <h3 className="pt-2 text-lg font-semibold text-white border-b border-white/20 pb-2">Endereço</h3>

            {/* Campos de CEP e Rua */}
            <div className="grid gap-5 md:grid-cols-3">
              <div className="md:col-span-1">
                <FormInput
                  label="CEP"
                  type="text"
                  name="cep"
                  placeholder="Digite o CEP"
                  value={formData.cep}
                  onChange={handleChange}
                  onBlur={handleCepBlur} // 👈 A MÁGICA ACONTECE AQUI
                  maxLength={9} // (Ex: 00000-000)
                />
              </div>
              <div className="md:col-span-2">
                <FormInput
                  label="Rua / Logradouro"
                  type="text"
                  name="logradouro"
                  placeholder="Rua (preenchimento automático)"
                  value={formData.logradouro} // 👈 Preenchido pelo ViaCEP
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Campos de Bairro, Cidade e Estado */}
            <div className="grid gap-5 md:grid-cols-3">
              <FormInput
                label="Bairro"
                type="text"
                name="bairro"
                placeholder="Bairro (automático)"
                value={formData.bairro} // 👈 Preenchido pelo ViaCEP
                onChange={handleChange}
              />
              <FormInput
                label="Cidade"
                type="text"
                name="cidade"
                placeholder="Cidade (automático)"
                value={formData.cidade} // 👈 Preenchido pelo ViaCEP
                onChange={handleChange}
              />
              <FormInput
                label="Estado (UF)"
                type="text"
                name="estado"
                placeholder="UF (automático)"
                value={formData.estado} // 👈 Preenchido pelo ViaCEP
                onChange={handleChange}
              />
            </div>

            {/* Linha divisória */}
            <h3 className="pt-2 text-lg font-semibold text-white border-b border-white/20 pb-2 mt-4">Sua Mensagem</h3>

            {/* Campo de Mensagem */}
            <FormTextarea
              rows="5"
              name="mensagem"
              placeholder="Sua mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              required
            />
            
            <Button type="submit" variant="primary" className="mt-2 bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:scale-105 !rounded-xl">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </section>

      {/* BOTÃO FIXO DE DENÚNCIA */}
      <Link
        to="/complaints"
        className="fixed z-50 p-4 font-bold text-white transition-transform bg-red-600 rounded-full shadow-2xl bottom-6 right-6 hover:bg-red-700 hover:scale-110"
        title="Fazer Denúncia"
      >
        <FaExclamationTriangle className="text-2xl" />
      </Link>
      {/* BOTÃO VOLTAR AO TOPO */}
      <ScrollToTopButton />
    </div>
  );
}
